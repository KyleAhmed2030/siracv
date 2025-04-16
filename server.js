const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for all routes
app.use(cors({
  origin: 'http://localhost:3000', // Allow the React dev server
  credentials: true
}));

// Parse JSON request body
app.use(express.json());

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from the Sira Resume Builder API' });
});

// For validation messages test
app.get('/api/localization/status', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Localization API is working',
    translations: {
      english: {
        count: 190,
        status: 'Complete'
      },
      arabic: {
        count: 194,
        status: 'Enhanced',
        recentlyAdded: [
          "End date must be after start date",
          "Institution name is required",
          "Job title is required when employer is specified",
          "Employer is required when job title is specified",
          "Please enter a valid URL starting with http:// or https://"
        ]
      }
    }
  });
});

// Serve static files from the React app build directory
app.use(express.static(path.join(__dirname, 'build')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API available at http://localhost:${PORT}/api/hello`);
  console.log(`Localization status API available at http://localhost:${PORT}/api/localization/status`);
  console.log(`Serving React app at http://localhost:${PORT}/`);
});