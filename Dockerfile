FROM node:18-slim

# Install git and other dependencies
RUN apt-get update && apt-get install -y \
    git \
    python3 \
    ffmpeg \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Clone the repository
RUN git clone https://github.com/ultar1/levanter .

# Initialize git locally without network access
RUN git init && \
    git config --global user.email "ezenwugoemmanuel2004@gmail.com" && \
    git config --global user.name "ultar1" && \
    git add . || exit 0 && \
    git commit -m "Local commit" || exit 0

# Install PM2 globally and Node.js dependencies
RUN npm install -g pm2
RUN npm install --legacy-peer-deps
RUN npm install dotenv --legacy-peer-deps

# Use PM2 ecosystem config with node directly
CMD ["pm2-runtime", "start", "ecosystem.config.js"]
