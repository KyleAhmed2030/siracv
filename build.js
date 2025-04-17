const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Helper function to copy directory contents recursively
function copyDir(src, dest) {
  // Create the destination directory if it doesn't exist
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  // Read the source directory
  const entries = fs.readdirSync(src, { withFileTypes: true });

  // Copy each entry to the destination
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      // Recursively copy subdirectories
      copyDir(srcPath, destPath);
    } else {
      // Copy files
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Run the build command
try {
  console.log('Building the React application...');
  execSync('react-scripts build', { stdio: 'inherit' });
  console.log('Build completed successfully!');

  // Ensure public directory exists
  console.log('Setting up public directory...');
  if (!fs.existsSync('public')) {
    fs.mkdirSync('public', { recursive: true });
  }

  // Copy build files to public directory
  console.log('Copying build files to public directory...');
  copyDir('build', 'public');

  console.log('Deployment preparation completed successfully!');
} catch (error) {
  console.error('Process failed:', error);
  process.exit(1);
}