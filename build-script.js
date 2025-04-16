// This is a helper script for Vercel deployment
const { execSync } = require('child_process');

// Log start of build process
console.log('Starting build process...');

try {
  // Skip building with CI=false to prevent treating warnings as errors
  console.log('Running build command...');
  execSync('CI=false npm run build', { stdio: 'inherit' });
  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed with error:', error);
  process.exit(1);
}