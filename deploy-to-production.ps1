<#
.SYNOPSIS
  Deploy webdune-blocks plugin to the PRODUCTION site via SCP.

.DESCRIPTION
  Builds the plugin, packages it into a ZIP (with Linux-safe paths), uploads
  to the server, backs up the existing plugin directory, and extracts the new
  version into the production plugins folder.

  Production plugin path:
    /home/sellmycell/htdocs/sellmycell.co.nz/wp-content/plugins/webdune-blocks/

.PARAMETER SshKey
  Path to the SSH private key. Default: ~/.ssh/github_rsa

.PARAMETER ServerIp
  Server IP address. Default: 170.64.232.219

.PARAMETER SkipBuild
  Skip the npm build step (use if you just ran it).

.PARAMETER Force
  Skip the confirmation prompt.

.EXAMPLE
  .\deploy-to-production.ps1
  .\deploy-to-production.ps1 -SkipBuild
  .\deploy-to-production.ps1 -SkipBuild -Force

.NOTES
  Requires: SSH key access to the server.
  WP-CLI activation may fail due to other plugin conflicts on this server.
  If so, activate manually at https://sellmycell.co.nz/wp-admin/plugins.php
#>

param(
    [string]$SshKey = "$env:USERPROFILE\.ssh\github_rsa",
    [string]$ServerIp = "170.64.232.219",
    [switch]$SkipBuild,
    [switch]$Force
)

$ErrorActionPreference = "Stop"

$PLUGIN_NAME = "webdune-blocks"
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$SshUser = "root"
$SshTarget = "$SshUser@$ServerIp"
$SshOpts = @("-i", $SshKey, "-o", "ServerAliveInterval=60", "-o", "StrictHostKeyChecking=accept-new")
$WpRoot = "/home/sellmycell/htdocs/sellmycell.co.nz"
$PluginPath = "$WpRoot/wp-content/plugins/$PLUGIN_NAME"
$RemoteTmp = "/tmp/$PLUGIN_NAME-deploy-$(Get-Random)"

# --- Helpers ---
function Ssh-Command {
    param([string]$Command)
    & ssh @SshOpts $SshTarget $Command
    if ($LASTEXITCODE -ne 0) {
        throw "SSH command failed (exit $LASTEXITCODE): $Command"
    }
}

function Scp-Upload {
    param([string]$LocalPath, [string]$RemotePath)
    & scp @SshOpts $LocalPath "${SshTarget}:${RemotePath}"
    if ($LASTEXITCODE -ne 0) {
        throw "SCP upload failed for $LocalPath"
    }
}

Write-Host ""
Write-Host "=== Deploy $PLUGIN_NAME to PRODUCTION ===" -ForegroundColor Red
Write-Host ""

# --- Confirmation ---
if (-not $Force) {
    Write-Host "You are about to deploy to the LIVE production site." -ForegroundColor Yellow
    Write-Host "  Site: https://sellmycell.co.nz" -ForegroundColor Gray
    Write-Host "  Path: $PluginPath" -ForegroundColor Gray
    Write-Host ""
    $confirm = Read-Host "Type 'yes' to continue"
    if ($confirm -ne 'yes') {
        Write-Host "Aborted." -ForegroundColor Yellow
        exit 0
    }
    Write-Host ""
}

# --- Step 1: Verify SSH key ---
if (-not (Test-Path $SshKey)) {
    Write-Host "SSH key not found: $SshKey" -ForegroundColor Red
    exit 1
}

# --- Step 2: Verify plugins directory exists on server ---
Write-Host "[1/6] Verifying production plugins directory..." -ForegroundColor Yellow
try {
    Ssh-Command "test -d '$WpRoot/wp-content/plugins' && echo 'OK'"
    Write-Host "  Plugins dir confirmed" -ForegroundColor Green
} catch {
    Write-Host "  Plugins directory not found: $WpRoot/wp-content/plugins" -ForegroundColor Red
    exit 1
}

# --- Step 3: Build ---
if (-not $SkipBuild) {
    Write-Host "[2/6] Building plugin (npm run build)..." -ForegroundColor Yellow
    Push-Location $ScriptDir
    try {
        npm run build
        if ($LASTEXITCODE -ne 0) {
            Write-Host "  Build failed" -ForegroundColor Red
            exit 1
        }
        Write-Host "  Build complete" -ForegroundColor Green
    } finally {
        Pop-Location
    }
} else {
    Write-Host "[2/6] Skipping build (--SkipBuild)" -ForegroundColor DarkGray
}

# --- Step 4: Create ZIP ---
Write-Host "[3/6] Packaging plugin..." -ForegroundColor Yellow

$ExcludePatterns = @(
    'node_modules',
    '.git',
    'docs',
    'backups',
    'WORK_LOGS',
    '*.sh',
    '*.ps1',
    'CREDENTIALS.local.md',
    'CREDENTIALS*.md',
    '.cursorrules',
    '.cursor',
    '.gitignore',
    'PROJECT_REFERENCE.md',
    'PROJECT_STATUS.md',
    'wp_cursor_brief.md',
    'aids.css',
    '*.zip',
    '.env*',
    'CLAUDE.md'
)

function Test-ShouldExclude {
    param([string]$ItemName, [string]$RelativePath)
    foreach ($pat in $ExcludePatterns) {
        if ($pat.StartsWith('*')) {
            if ($ItemName -like $pat) { return $true }
        } else {
            $sep = [regex]::Escape([IO.Path]::DirectorySeparatorChar)
            $segments = $RelativePath -split $sep
            if ($segments -contains $pat) { return $true }
            if ($ItemName -eq $pat) { return $true }
        }
    }
    return $false
}

function Copy-PluginFiles {
    param([string]$SourcePath, [string]$DestPath, [string]$RelativePath = "")
    Get-ChildItem -Path $SourcePath -Force | ForEach-Object {
        $name = $_.Name
        $rel = if ($RelativePath) { "$RelativePath\$name" } else { $name }
        if (Test-ShouldExclude -ItemName $name -RelativePath $rel) { return }

        $dest = Join-Path $DestPath $name
        if ($_.PSIsContainer) {
            New-Item -ItemType Directory -Path $dest -Force | Out-Null
            Copy-PluginFiles -SourcePath $_.FullName -DestPath $dest -RelativePath $rel
        } else {
            Copy-Item -Path $_.FullName -Destination $dest -Force
        }
    }
}

$TempDir = Join-Path $env:TEMP "$PLUGIN_NAME-production-$(Get-Random)"
$PluginTempDir = Join-Path $TempDir $PLUGIN_NAME
New-Item -ItemType Directory -Path $PluginTempDir -Force | Out-Null
Copy-PluginFiles -SourcePath $ScriptDir -DestPath $PluginTempDir

# Resolve to long path — $env:TEMP may use 8.3 short names (e.g. JOSUEM~1)
# but Get-ChildItem .FullName returns long names, breaking Substring math
$PluginTempDir = (Get-Item $PluginTempDir).FullName

$ZipPath = Join-Path $env:TEMP "$PLUGIN_NAME-production.zip"
if (Test-Path $ZipPath) { Remove-Item $ZipPath -Force }

Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem
$zip = [System.IO.Compression.ZipFile]::Open($ZipPath, [System.IO.Compression.ZipArchiveMode]::Create)
try {
    Get-ChildItem -Path $PluginTempDir -Recurse -File | ForEach-Object {
        $relative = $_.FullName.Substring($PluginTempDir.Length).TrimStart('\', '/')
        $entryName = ($relative -replace '\\', '/')
        [void][System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile(
            $zip, $_.FullName, $entryName,
            [System.IO.Compression.CompressionLevel]::Optimal
        )
    }
} finally {
    $zip.Dispose()
}

Remove-Item -Recurse -Force $TempDir
$zipSize = [math]::Round((Get-Item $ZipPath).Length / 1MB, 2)
Write-Host "  ZIP created ($zipSize MB)" -ForegroundColor Green

# --- Step 5: Upload + extract on server ---
Write-Host "[4/6] Uploading to server..." -ForegroundColor Yellow
Scp-Upload $ZipPath "${RemoteTmp}.zip"
Write-Host "  Upload complete" -ForegroundColor Green

Write-Host "[5/6] Extracting on server..." -ForegroundColor Yellow
$timestamp = Get-Date -Format 'yyyyMMdd-HHmm'

# Build the remote bash script as a single here-string (no PS interpolation issues)
$remoteScript = @"
set -e
PLUGIN_DIR='$PluginPath'
PLUGINS_PARENT='$WpRoot/wp-content/plugins'
ZIP_FILE='${RemoteTmp}.zip'
BACKUP_DIR='/tmp/webdune-blocks-backup-$timestamp'

if [ -d "`$PLUGIN_DIR" ]; then
    cp -r "`$PLUGIN_DIR" "`$BACKUP_DIR"
    echo "Backed up to `$BACKUP_DIR"
    rm -rf "`$PLUGIN_DIR"
fi

mkdir -p "`$PLUGIN_DIR"
cd "`$PLUGIN_DIR"
unzip -o "`$ZIP_FILE"

OWNER=`$(stat -c '%U:%G' "`$PLUGINS_PARENT")
chown -R "`$OWNER" "`$PLUGIN_DIR"

rm -f "`$ZIP_FILE"
echo 'Deploy complete'
"@

# Strip Windows CRLF — bash chokes on \r in piped scripts
$remoteScript = $remoteScript -replace "`r", ""
$remoteScript | & ssh @SshOpts $SshTarget "bash -s"
if ($LASTEXITCODE -ne 0) {
    throw "Remote extraction failed"
}

# Cleanup local temp ZIP
Remove-Item $ZipPath -Force

# --- Step 6: Activate plugin via WP-CLI ---
Write-Host "[6/6] Activating plugin..." -ForegroundColor Yellow

$activateScript = @"
set -e
cd '$WpRoot'

# Verify main plugin file exists before activating
if [ ! -f 'wp-content/plugins/$PLUGIN_NAME/$PLUGIN_NAME.php' ]; then
    echo 'ERROR: Plugin file not found after extraction!'
    ls -la 'wp-content/plugins/$PLUGIN_NAME/' 2>&1 || true
    exit 1
fi

# Check if already active
STATUS=`$(wp plugin status $PLUGIN_NAME --allow-root 2>&1 || true)
if echo "`$STATUS" | grep -q 'Status: Active'; then
    echo 'Plugin already active'
else
    wp plugin activate $PLUGIN_NAME --allow-root 2>&1
    echo 'Plugin activated'
fi
"@

# Strip Windows CRLF
$activateScript = $activateScript -replace "`r", ""
$activateScript | & ssh @SshOpts $SshTarget "bash -s"
if ($LASTEXITCODE -ne 0) {
    Write-Host "  WP-CLI activation failed (known issue - activate manually in wp-admin)" -ForegroundColor Yellow
    Write-Host "  https://sellmycell.co.nz/wp-admin/plugins.php" -ForegroundColor Yellow
} else {
    Write-Host "  Plugin active" -ForegroundColor Green
}

Write-Host ""
Write-Host "=== Deployed to PRODUCTION ===" -ForegroundColor Green
Write-Host ""
Write-Host "  Site:         https://sellmycell.co.nz" -ForegroundColor Gray
Write-Host "  WP Admin:     https://sellmycell.co.nz/wp-admin/" -ForegroundColor Gray
Write-Host "  Plugin path:  $PluginPath" -ForegroundColor Gray
Write-Host ""
Write-Host "Test the site and check browser console for errors." -ForegroundColor Yellow
Write-Host ""
