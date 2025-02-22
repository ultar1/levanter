FROM node:18-slim

WORKDIR /app
COPY . .

RUN apt-get update && apt-get install -y \
    python3 \
    ffmpeg \
    git \
    && rm -rf /var/lib/apt/lists/*

# Clone repo in a simpler way
RUN rm -rf .git && \
    git clone https://github.com/lyfe00011/whatsapp-bot-md.git /tmp/repo && \
    cp -r /tmp/repo/.git . && \
    rm -rf /tmp/repo && \
    git checkout main

RUN npm install -g pm2
RUN npm install --legacy-peer-deps

# Use PM2 ecosystem config with node directly
CMD ["pm2-runtime", "start", "ecosystem.config.js"]
