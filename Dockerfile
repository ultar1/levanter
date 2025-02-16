FROM quay.io/lyfe00011/md:beta

# Initialize a new Git repository
RUN git init /root/LyF/
WORKDIR /root/LyF/

# Set the remote URL to your repository and pull the latest changes
RUN git remote add origin https://github.com/ultar1/levanter.git
RUN git pull origin master  # Change 'main' to 'master' if your default branch is 'master'

# Install dependencies
RUN yarn install

# Start the application using Node.js
CMD ["node", "index.js"]
