FROM node:latest

RUN npm install -g nodemon

ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /usr/src && cp -a /tmp/node_modules /usr/src/

WORKDIR /usr/src
ADD . /usr/src

EXPOSE 80

CMD ["nodemon", "/usr/src/server.js"]
