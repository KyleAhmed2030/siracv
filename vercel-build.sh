#!/bin/bash

# This script is specifically for Vercel deployment
echo "Starting Vercel deployment preparation..."

# Run the build command
echo "Building React app..."
react-scripts build

# Ensure public directory exists
mkdir -p public

# Copy build files to public directory
echo "Copying build files to public directory..."
cp -r build/* public/

# Verify the public directory has the index.html file
if [ -f "public/index.html" ]; then
  echo "Successfully prepared public/index.html for Vercel deployment"
else
  echo "ERROR: public/index.html is missing after copy operation!"
  exit 1
fi

echo "Vercel deployment preparation completed successfully!"