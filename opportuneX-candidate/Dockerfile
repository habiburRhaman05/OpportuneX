FROM node:20-alpine

# Set working directory
WORKDIR /app

# 1. Copy ONLY dependency files first
COPY package*.json ./

# 2. Install dependencies (this layer is now cached)
RUN npm install

# 3. Copy the rest of the application code
COPY . . 

EXPOSE 8080

# Start the app in development mode
CMD [ "npm", "run", "dev" ]
