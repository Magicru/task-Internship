FROM node:slim

WORKDIR /server

COPY data ./data
COPY utils ./utils
COPY index.js .
COPY package.json .

RUN npm install
CMD npm start

EXPOSE 8080/tcp
