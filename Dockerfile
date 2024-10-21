FROM quay.io/lyfe00011/md:beta

RUN git clone https://github.com/lyfe00011/levanter.git /root/ultar/
WORKDIR /root/ultar/
RUN yarn install

EXPOSE 3000

CMD ["npm", "start"]
