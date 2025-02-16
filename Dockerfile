FROM quay.io/lyfe00011/md:beta
RUN git clone https://github.com/ultar1/levanter /root/LyF/
WORKDIR /root/LyF/
RUN yarn install
CMD ["pm2-runtime", "start", "ecosystem.config.js"]
