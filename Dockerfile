FROM node:18-slim

WORKDIR /app
COPY . .

RUN apt-get update && apt-get install -y \
    python3 \
    ffmpeg \
    && rm -rf /var/lib/apt/lists/*

RUN npm install -g pm2
RUN npm install --legacy-peer-deps

# Set the CMD to run PM2 in no-daemon mode
CMD ["pm2-runtime", "start", "npm", "--", "start"]
