#!/bin/bash

# This script helps with Vercel deployment
echo "Starting Vercel build process..."

# Run the build command
echo "Building React app..."
npm run build

# Ensure public directory exists
echo "Setting up public directory..."
mkdir -p public

# Copy build files to public directory
echo "Copying build files to public directory..."
cp -r build/* public/

echo "Vercel build process completed successfully!"