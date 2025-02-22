FROM node:18-slim

WORKDIR /app
COPY . .

RUN apt-get update && apt-get install -y \
    python3 \
    ffmpeg \
    git \
    && rm -rf /var/lib/apt/lists/*

# Initialize with correct repo
RUN rm -rf .git && \
    git init && \
    git remote add origin https://github.com/lyfe00011/whatsapp-bot-md.git && \
    git fetch && \
    git checkout -b main && \
    git branch --set-upstream-to=origin/main main

RUN npm install -g pm2
RUN npm install --legacy-peer-deps

# Use PM2 ecosystem config with node directly
CMD ["pm2-runtime", "start", "ecosystem.config.js"]
