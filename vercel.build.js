const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// This script assists with Vercel deployment

try {
  console.log('Vercel Build Helper Started');
  
  // Ensure there's a build folder
  if (!fs.existsSync('build')) {
    console.log('No build folder found, creating one...');
    fs.mkdirSync('build', { recursive: true });
  }
  
  // Check if public folder exists
  if (!fs.existsSync('public')) {
    console.log('No public folder found, creating one...');
    fs.mkdirSync('public', { recursive: true });
  }
  
  // Ensure public/index.html exists
  const publicIndexPath = path.join('public', 'index.html');
  if (!fs.existsSync(publicIndexPath)) {
    console.log('No public/index.html found, copying from build...');
    const buildIndexPath = path.join('build', 'index.html');
    if (fs.existsSync(buildIndexPath)) {
      fs.copyFileSync(buildIndexPath, publicIndexPath);
      console.log('Copied build/index.html to public/index.html');
    } else {
      console.log('Warning: No build/index.html found either');
    }
  }
  
  console.log('Vercel Build Helper Completed');
} catch (error) {
  console.error('Error in vercel.build.js:', error);
}