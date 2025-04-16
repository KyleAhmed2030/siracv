const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 5000;

// Proxy requests to React dev server when in development
app.use((req, res, next) => {
  // Check if we're in development mode (no build folder)
  if (!fs.existsSync(path.join(__dirname, 'build'))) {
    console.log(`Proxy request to dev server: ${req.url}`);
    // Just display a message about using the development server
    return res.send(`
      <html>
        <head>
          <title>Sira Resume Builder</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; max-width: 800px; margin: 40px auto; padding: 20px; }
            h1 { color: #333; }
            .box { background: #f4f4f4; padding: 20px; border-radius: 5px; margin-bottom: 20px; }
            .steps { background: #f9f9f9; padding: 15px; border-left: 4px solid #4CAF50; }
            code { background: #eee; padding: 2px 5px; border-radius: 3px; }
          </style>
        </head>
        <body>
          <h1>Sira Resume Builder - Deployment Instructions</h1>
          <div class="box">
            <p>Your application is running in development mode through React's dev server on port 3000.</p>
            <p>For Vercel deployment, please follow these steps:</p>
          </div>
          <div class="steps">
            <h3>Step 1: Download your code</h3>
            <p>Click the three dots menu in Replit → Download as zip</p>
            
            <h3>Step 2: Create a GitHub repository</h3>
            <p>Go to GitHub and create a new repository named "sira-resume-builder"</p>
            
            <h3>Step 3: Upload your code</h3>
            <p>Upload your downloaded zip to the new GitHub repository</p>
            
            <h3>Step 4: Connect to Vercel</h3>
            <p>Sign in to Vercel → Import your GitHub repository</p>
            
            <h3>Step 5: Configure deployment</h3>
            <p>Framework preset: <code>Create React App</code></p>
            <p>Build command: <code>npm run build</code></p>
            <p>Output directory: <code>build</code></p>
            
            <h3>Step 6: Deploy</h3>
            <p>Click "Deploy" and wait for your site to go live</p>
          </div>
          <p>To access your running dev server, visit: <a href="http://localhost:3000">http://localhost:3000</a></p>
        </body>
      </html>
    `);
  }
  next();
});

// Serve static files from the React app build directory (if it exists)
app.use(express.static(path.join(__dirname, 'build')));

// Fallback route to index.html for SPA routing
app.use((req, res) => {
  // Check if build folder exists
  if (fs.existsSync(path.join(__dirname, 'build', 'index.html'))) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  } else {
    // If no build folder, redirect to the proper development server
    res.redirect('http://localhost:3000');
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
  if (!fs.existsSync(path.join(__dirname, 'build'))) {
    console.log(`No build folder found - serving deployment instructions. Use the development server at http://localhost:3000 to view your app.`);
  }
});