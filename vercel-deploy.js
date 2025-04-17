const fs = require('fs');
const path = require('path');

/**
 * This script prepares the existing build for Vercel deployment.
 * It copies files from the build directory to public if needed,
 * but doesn't try to rebuild the project from scratch.
 */

// Check if public directory exists and contains index.html
const publicDir = path.join(__dirname, 'public');
const publicIndexHtml = path.join(publicDir, 'index.html');
const buildDir = path.join(__dirname, 'build');
const buildIndexHtml = path.join(buildDir, 'index.html');

console.log('Vercel Deployment Helper');
console.log('-----------------------');

// Check if public/index.html exists
if (fs.existsSync(publicIndexHtml)) {
  console.log('✓ public/index.html exists');
} else {
  console.log('! public/index.html not found, checking build directory...');
  
  // Check if build/index.html exists
  if (fs.existsSync(buildIndexHtml)) {
    console.log('✓ build/index.html exists, copying to public directory...');
    
    // Ensure public directory exists
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
      console.log('✓ Created public directory');
    }
    
    // Copy build contents to public directory
    const copyDir = (src, dest) => {
      if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
      }
      
      const entries = fs.readdirSync(src, { withFileTypes: true });
      
      for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);
        
        if (entry.isDirectory()) {
          copyDir(srcPath, destPath);
        } else {
          fs.copyFileSync(srcPath, destPath);
        }
      }
    };
    
    try {
      copyDir(buildDir, publicDir);
      console.log('✓ Successfully copied build files to public directory');
    } catch (error) {
      console.error('Error copying files:', error);
      process.exit(1);
    }
  } else {
    console.error('! Neither public/index.html nor build/index.html found');
    console.error('Please run the build process first');
    process.exit(1);
  }
}

// Create _vercel.txt to mark directory for Vercel
fs.writeFileSync(path.join(publicDir, '_vercel.txt'), 'Ready for Vercel deployment');
console.log('✓ Created _vercel.txt marker file');

console.log('✓ Deployment preparation complete!');