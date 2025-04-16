const express = require('express');
const session = require('express-session');
const path = require('path');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const cookieParser = require('cookie-parser');

// Create Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'sira-resume-builder-secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    httpOnly: true
  }
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Simple in-memory user storage (replace with database in production)
const users = [];

// Password hashing
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

// Configure Passport local strategy
passport.use(new LocalStrategy(
  { usernameField: 'email' },
  async (email, password, done) => {
    try {
      // Find user by email
      const user = users.find(u => u.email === email);
      
      // User not found
      if (!user) {
        return done(null, false, { message: 'Invalid email or password' });
      }
      
      // Check password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return done(null, false, { message: 'Invalid email or password' });
      }
      
      // Success
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

// Serialize user for session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser((id, done) => {
  const user = users.find(u => u.id === id);
  if (!user) {
    return done(new Error('User not found'));
  }
  done(null, user);
});

// Authentication routes
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    
    // Check if email already exists
    if (users.some(u => u.email === email)) {
      return res.status(400).json({ message: 'Email already in use' });
    }
    
    // Create new user
    const hashedPassword = await hashPassword(password);
    const newUser = {
      id: uuidv4(),
      name,
      email,
      password: hashedPassword,
      createdAt: new Date()
    };
    
    // Save user
    users.push(newUser);
    
    // Log in the newly registered user
    req.login(newUser, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Login failed after registration' });
      }
      
      // Return user data (excluding password)
      const { password, ...userData } = newUser;
      return res.status(201).json(userData);
    });
  } catch (error) {
    console.error('Registration error:', error);
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
      
      // Return user data (excluding password)
      const { password, ...userData } = user;
      return res.json(userData);
    });
  })(req, res, next);
});

app.post('/api/logout', (req, res) => {
  req.logout(function(err) {
    if (err) {
      return res.status(500).json({ message: 'Logout failed' });
    }
    res.sendStatus(200);
  });
});

app.get('/api/user', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: 'Not authenticated' });
  }
  
  // Return user data (excluding password)
  const { password, ...userData } = req.user;
  res.json(userData);
});

// Serve static files from the React app in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'build')));
  
  // Handle all other routes by serving the React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
}

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});