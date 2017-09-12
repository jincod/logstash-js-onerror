FROM node:alpine

ENV NODE_ENV=production \
    NPM_CONFIG_LOGLEVEL=warn \
    PORT=3000 \
    PROJECTS=

COPY package.json .

RUN npm install

COPY server/* ./

EXPOSE $PORT
CMD [ "node", "server.js" ]