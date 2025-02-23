FROM node:18-slim

# Install git
RUN apt-get update && apt-get install -y \
    git \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Clone the repository
RUN git clone https://github.com/ultar1/levanter .

RUN apt-get update && apt-get install -y \
    python3 \
    ffmpeg \
    && rm -rf /var/lib/apt/lists/*

# Initialize git locally without network access
RUN git init && \
    git config --global user.email "ezenwugoemmanuel2004@gmail.com" && \
    git config --global user.name "ultar1" && \
    git add . && \
    git commit -m "Local commit"

RUN npm install -g pm2
RUN npm install --legacy-peer-deps

# Use PM2 ecosystem config with node directly
CMD ["pm2-runtime", "start", "ecosystem.config.js"]
