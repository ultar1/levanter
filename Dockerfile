FROM node:18-slim

# Clone the repository
RUN git clone https://github.com/ultar1/levanter.git /root/LyF/
WORKDIR /root/LyF/

# Install dependencies
RUN yarn install

# Expose the required port
EXPOSE 3000

# Use PM2 to start the application with index.js
CMD ["pm2-runtime", "start", "index.js"]
