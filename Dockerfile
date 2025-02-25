FROM quay.io/lyfe00011/md:beta

# Clone the repository
RUN git clone https://github.com/lyfe00011/levanter.git /root/LyF/
WORKDIR /root/LyF/

# Install dependencies
RUN yarn install

# Expose the required port
EXPOSE 3000

# Use PM2 to start the application with index.js
CMD ["pm2-runtime", "start", "index.js"]
