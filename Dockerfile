FROM quay.io/lyfe00011/md:beta
RUN git clone https://github.com/lyfe00011/levanter.git /root/LyF/
WORKDIR /root/LyF/
RUN yarn install --network-concurrency 1
CMD ["npm", "start"]
