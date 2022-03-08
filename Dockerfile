FROM node:17
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
RUN npm install -g typescript
RUN npm install -g ts-node
COPY package*.json ./
RUN npm install
COPY . .
COPY --chown=node:node . .
USER node
EXPOSE 8080

CMD [ "ts-node", "server.ts" ]
