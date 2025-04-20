const fs = require('fs');
const path = require('path');

/**
 * This script adds Google AdSense meta tag to HTML files in both build and public directories
 */
console.log('Adding Google AdSense meta tag to HTML files...');

const adsenseMeta = '<meta name="google-adsense-account" content="ca-pub-7373257918048147">';
const buildIndexPath = path.join(__dirname, 'build', 'index.html');
const publicIndexPath = path.join(__dirname, 'public', 'index.html');

// Function to add adsense meta tag to HTML file
const addAdsenseMetaTag = (filePath) => {
  if (fs.existsSync(filePath)) {
    console.log(`Processing ${filePath}...`);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check if meta tag already exists
    if (content.includes('google-adsense-account')) {
      console.log(`AdSense meta tag already exists in ${filePath}`);
      return true;
    }
    
    // Insert meta tag before </head>
    content = content.replace(/<\/head>/i, `  ${adsenseMeta}\n</head>`);
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Successfully added AdSense meta tag to ${filePath}`);
    return true;
  } else {
    console.log(`File ${filePath} does not exist`);
    return false;
  }
};

// Add meta tag to build/index.html
const buildResult = addAdsenseMetaTag(buildIndexPath);

// Add meta tag to public/index.html
const publicResult = addAdsenseMetaTag(publicIndexPath);

if (buildResult || publicResult) {
  console.log('Google AdSense meta tag has been added successfully.');
} else {
  console.error('Error: Could not find any index.html files to modify.');
  process.exit(1);
}