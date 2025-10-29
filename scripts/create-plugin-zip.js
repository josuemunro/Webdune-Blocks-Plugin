#!/usr/bin/env node

/**
 * Create Plugin ZIP
 * 
 * This script creates a production-ready ZIP file of the plugin
 * that can be uploaded directly to WordPress.
 * 
 * Usage: npm run plugin-zip
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const archiver = require('archiver');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logStep(step, message) {
  log(`\n[${step}] ${message}`, 'blue');
}

function logSuccess(message) {
  log(`✓ ${message}`, 'green');
}

function logError(message) {
  log(`✗ ${message}`, 'red');
}

function logWarning(message) {
  log(`⚠ ${message}`, 'yellow');
}

// Get plugin version from main PHP file
function getPluginVersion() {
  const phpFile = path.join(__dirname, '..', 'webdune-blocks.php');
  const content = fs.readFileSync(phpFile, 'utf8');
  const match = content.match(/Version:\s*(\d+\.\d+\.\d+)/);
  return match ? match[1] : '1.0.0';
}

// Main function
async function createPluginZip() {
  const version = getPluginVersion();
  const rootDir = path.join(__dirname, '..');
  const outputDir = path.join(rootDir, 'releases');
  const zipFileName = `webdune-blocks-v${version}.zip`;
  const zipFilePath = path.join(outputDir, zipFileName);

  log('\n╔════════════════════════════════════════════╗', 'bright');
  log('║   Webdune Blocks - Plugin ZIP Creator     ║', 'bright');
  log('╚════════════════════════════════════════════╝', 'bright');
  log(`\nVersion: ${version}`, 'yellow');
  log(`Output: releases/${zipFileName}\n`, 'yellow');

  try {
    // Step 1: Clean old build
    logStep('1/5', 'Cleaning old build files...');
    if (fs.existsSync(path.join(rootDir, 'build'))) {
      fs.rmSync(path.join(rootDir, 'build'), { recursive: true, force: true });
      logSuccess('Cleaned build directory');
    }

    // Step 2: Run production build
    logStep('2/5', 'Building production assets...');
    try {
      execSync('npm run build', {
        cwd: rootDir,
        stdio: 'inherit'
      });
      logSuccess('Production build complete');
    } catch (error) {
      logError('Build failed');
      process.exit(1);
    }

    // Step 3: Verify build folder exists
    logStep('3/5', 'Verifying build output...');
    const buildDir = path.join(rootDir, 'build');
    if (!fs.existsSync(buildDir)) {
      logError('Build directory not found!');
      process.exit(1);
    }

    const buildFiles = fs.readdirSync(buildDir);
    if (buildFiles.length === 0) {
      logError('Build directory is empty!');
      process.exit(1);
    }
    logSuccess(`Build verified (${buildFiles.length} items)`);

    // Step 4: Create releases directory
    logStep('4/5', 'Preparing output directory...');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Remove old ZIP if exists
    if (fs.existsSync(zipFilePath)) {
      fs.unlinkSync(zipFilePath);
      logWarning(`Removed old ${zipFileName}`);
    }

    // Step 5: Create ZIP file
    logStep('5/5', 'Creating ZIP file...');

    const output = fs.createWriteStream(zipFilePath);
    const archive = archiver('zip', {
      zlib: { level: 9 } // Maximum compression
    });

    // Listen for errors
    archive.on('error', (err) => {
      throw err;
    });

    // Track progress
    let fileCount = 0;
    archive.on('entry', () => {
      fileCount++;
    });

    // Pipe archive data to the file
    archive.pipe(output);

    // Files and directories to include
    const includes = [
      // Core plugin files
      { path: 'webdune-blocks.php', required: true },

      // Build directory (compiled assets)
      { path: 'build/', required: true },

      // PHP includes
      { path: 'includes/', required: true },

      // Assets (fonts)
      { path: 'assets/', required: false },

      // Documentation (optional but helpful)
      { path: 'README.md', required: false },
      { path: 'QUICK_REFERENCE.md', required: false },
      { path: 'PHONE_SEARCH_IMPLEMENTATION.md', required: false },
      { path: 'PHONE_SLIDER_IMPLEMENTATION.md', required: false },
      { path: 'REVIEWS_MARQUEE_IMPLEMENTATION.md', required: false },
    ];

    // Add files/directories to archive
    for (const item of includes) {
      const fullPath = path.join(rootDir, item.path);

      if (fs.existsSync(fullPath)) {
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
          // Add directory
          archive.directory(fullPath, `webdune-blocks/${item.path}`);
          log(`  + ${item.path}`, 'green');
        } else {
          // Add file
          archive.file(fullPath, { name: `webdune-blocks/${item.path}` });
          log(`  + ${item.path}`, 'green');
        }
      } else if (item.required) {
        logError(`Required file/directory not found: ${item.path}`);
        process.exit(1);
      } else {
        logWarning(`Optional file not found (skipped): ${item.path}`);
      }
    }

    // Finalize the archive
    await archive.finalize();

    // Wait for the stream to finish
    await new Promise((resolve, reject) => {
      output.on('close', resolve);
      output.on('error', reject);
    });

    // Get file size
    const stats = fs.statSync(zipFilePath);
    const fileSizeMB = (stats.size / (1024 * 1024)).toFixed(2);

    // Success!
    log('\n╔════════════════════════════════════════════╗', 'bright');
    log('║             BUILD SUCCESSFUL!              ║', 'green');
    log('╚════════════════════════════════════════════╝', 'bright');
    log(`\n📦 ZIP File: ${zipFileName}`, 'green');
    log(`📍 Location: releases/`, 'green');
    log(`📊 Size: ${fileSizeMB} MB`, 'green');
    log(`📄 Files: ${fileCount} items\n`, 'green');

    log('Next steps:', 'yellow');
    log('  1. Go to WordPress Admin → Plugins → Add New', 'reset');
    log('  2. Click "Upload Plugin"', 'reset');
    log(`  3. Choose: releases/${zipFileName}`, 'reset');
    log('  4. Click "Install Now"', 'reset');
    log('  5. Activate the plugin\n', 'reset');

  } catch (error) {
    logError(`\nError: ${error.message}`);
    process.exit(1);
  }
}

// Run the script
createPluginZip();

