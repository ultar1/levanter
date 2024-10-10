FROM quay.io/lyfe00011/md:beta
RUN git clone https://github.com/lyfe00011/levanter.git /root/Ultar/
WORKDIR /root/Ultar/
RUN yarn install
CMD ["npm", "start"]
