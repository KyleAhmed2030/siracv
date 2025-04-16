const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  secret: 'sira-resume-builder-secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    secure: process.env.NODE_ENV === 'production'
  }
}));

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

// User database (in-memory for development)
// In production, this would be replaced with a real database
const USERS_DB_FILE = path.join(__dirname, 'users.json');
let users = [];

// Load users from file if it exists
try {
  if (fs.existsSync(USERS_DB_FILE)) {
    const data = fs.readFileSync(USERS_DB_FILE, 'utf8');
    users = JSON.parse(data);
  }
} catch (err) {
  console.error('Error loading users:', err);
}

// Save users to file
const saveUsers = () => {
  try {
    fs.writeFileSync(USERS_DB_FILE, JSON.stringify(users, null, 2));
  } catch (err) {
    console.error('Error saving users:', err);
  }
};

// Configure passport local strategy
passport.use(new LocalStrategy(
  { usernameField: 'email' },
  async (email, password, done) => {
    try {
      const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
      
      if (!user) {
        return done(null, false, { message: 'Incorrect email or password' });
      }
      
      const isMatch = await bcrypt.compare(password, user.password);
      
      if (!isMatch) {
        return done(null, false, { message: 'Incorrect email or password' });
      }
      
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const user = users.find(u => u.id === id);
  done(null, user);
});

// Check if user is authenticated middleware
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: 'Not authenticated' });
};

// Authentication routes
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    
    // Check if user already exists
    if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
      return res.status(400).json({ message: 'Email already registered' });
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Create new user
    const newUser = {
      id: uuidv4(),
      name,
      email,
      password: hashedPassword,
      savedResumes: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // Add user to database
    users.push(newUser);
    saveUsers();
    
    // Log in the user
    req.login(newUser, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error logging in after registration' });
      }
      const userResponse = { ...newUser };
      delete userResponse.password;
      return res.status(201).json(userResponse);
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

app.post('/api/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: info.message || 'Authentication failed' });
    }
    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      const userResponse = { ...user };
      delete userResponse.password;
      return res.json(userResponse);
    });
  })(req, res, next);
});

app.post('/api/logout', (req, res) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.status(200).json({ message: 'Logged out successfully' });
  });
});

app.get('/api/user', (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Not authenticated' });
  }
  
  const userResponse = { ...req.user };
  delete userResponse.password;
  res.json(userResponse);
});

// Resume saving and loading routes
app.post('/api/resumes', isAuthenticated, (req, res) => {
  try {
    const { resumeData } = req.body;
    if (!resumeData) {
      return res.status(400).json({ message: 'Resume data is required' });
    }
    
    const userId = req.user.id;
    const user = users.find(u => u.id === userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // If resume has an id, update it
    if (resumeData.id) {
      const index = user.savedResumes.findIndex(r => r.id === resumeData.id);
      if (index !== -1) {
        user.savedResumes[index] = {
          ...resumeData,
          updatedAt: new Date().toISOString()
        };
      } else {
        // If resume id not found, create a new one
        user.savedResumes.push({
          ...resumeData,
          id: uuidv4(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
      }
    } else {
      // Create new resume
      user.savedResumes.push({
        ...resumeData,
        id: uuidv4(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    }
    
    user.updatedAt = new Date().toISOString();
    saveUsers();
    
    res.status(201).json({ message: 'Resume saved successfully', resumes: user.savedResumes });
  } catch (err) {
    console.error('Save resume error:', err);
    res.status(500).json({ message: 'Server error while saving resume' });
  }
});

app.get('/api/resumes', isAuthenticated, (req, res) => {
  try {
    const userId = req.user.id;
    const user = users.find(u => u.id === userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user.savedResumes);
  } catch (err) {
    console.error('Get resumes error:', err);
    res.status(500).json({ message: 'Server error while fetching resumes' });
  }
});

app.delete('/api/resumes/:id', isAuthenticated, (req, res) => {
  try {
    const resumeId = req.params.id;
    const userId = req.user.id;
    const user = users.find(u => u.id === userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    user.savedResumes = user.savedResumes.filter(r => r.id !== resumeId);
    user.updatedAt = new Date().toISOString();
    saveUsers();
    
    res.json({ message: 'Resume deleted successfully', resumes: user.savedResumes });
  } catch (err) {
    console.error('Delete resume error:', err);
    res.status(500).json({ message: 'Server error while deleting resume' });
  }
});

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
}

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});