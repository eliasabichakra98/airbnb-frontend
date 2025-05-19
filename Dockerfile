# Use the official Node.js 18 LTS image as base
FROM node:23-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json for dependency installation
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the source code
COPY . .

# Expose port 5173 (React default dev server port)
EXPOSE 5173

# Run the development server
CMD ["npm", "run", "dev"]
