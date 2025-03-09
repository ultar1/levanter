FROM node:14

# Install Git
RUN apt-get update && apt-get install -y git

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Command to start the application
CMD ["node", "index.js"]
