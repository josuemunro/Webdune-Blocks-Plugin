/**
 * Add assets folder to the plugin zip file
 * This script runs after wp-scripts plugin-zip to include the assets folder
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const zipFile = 'webdune-blocks.zip';
const assetsDir = 'assets';

// Check if zip file exists
if (!fs.existsSync(zipFile)) {
  console.error('❌ Error: webdune-blocks.zip not found');
  process.exit(1);
}

// Check if assets folder exists
if (!fs.existsSync(assetsDir)) {
  console.error('❌ Error: assets folder not found');
  process.exit(1);
}

try {
  // Try to use 7zip if available (common on Windows)
  try {
    execSync(`7z a "${zipFile}" "${assetsDir}" -r`, { stdio: 'inherit' });
    console.log('\n✅ Assets folder added to zip using 7zip');
    process.exit(0);
  } catch (e) {
    // 7zip not available, try PowerShell
    try {
      const psCommand = `Compress-Archive -Path "${assetsDir}" -Update -DestinationPath "${zipFile}"`;
      execSync(`powershell -Command "${psCommand}"`, { stdio: 'inherit' });
      console.log('\n✅ Assets folder added to zip using PowerShell');
      process.exit(0);
    } catch (e2) {
      console.error('\n⚠️  Could not add assets to zip automatically.');
      console.error('📝 Please manually add the assets folder to webdune-blocks.zip');
      console.error('   Or install 7-Zip: https://www.7-zip.org/');
      process.exit(1);
    }
  }
} catch (error) {
  console.error('\n❌ Error adding assets to zip:', error.message);
  process.exit(1);
}

