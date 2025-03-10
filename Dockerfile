# Use an official Node.js runtime as a parent image
FROM node:20

# Set the working directory in the container
WORKDIR /usr/src/app

# Install Git
RUN apt-get update && \
    apt-get install -y git

# Copy the package.json and yarn.lock files to the container
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code to the container
COPY . .

# Start the application
CMD ["pm2-runtime", "start", "index.js", "--name", "levanter"]
