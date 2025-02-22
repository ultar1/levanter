FROM node:18-slim

WORKDIR /app
COPY . .

RUN apt-get update && apt-get install -y \
    python3 \
    ffmpeg \
    git \
    && rm -rf /var/lib/apt/lists/*

RUN npm install -g pm2
RUN npm install --legacy-peer-deps

# Use PM2 ecosystem config with node directly
CMD ["pm2-runtime", "start", "ecosystem.config.js"]
