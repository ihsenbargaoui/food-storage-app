# Use official Node.js image as the base
FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json (if exists)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the application (optional if you're using TypeScript)
RUN npm run build

# Expose the port the app will run on
EXPOSE 3000

# Run the application
CMD ["npm", "run", "start:prod"]
