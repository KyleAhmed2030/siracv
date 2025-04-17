#!/bin/bash

# Display Node.js and npm versions
echo "Node.js version: $(node -v)"
echo "npm version: $(npm -v)"

# Install dependencies
echo "Installing dependencies..."
npm install

# Build the React application
echo "Building the application..."
node_modules/.bin/react-scripts build

# Ensure build directory exists
if [ -d "build" ]; then
  echo "Build directory exists. Checking contents..."
  ls -la build
  echo "Build completed successfully!"
else
  echo "Error: Build directory not found!"
  exit 1
fi