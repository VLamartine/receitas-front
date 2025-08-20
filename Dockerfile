# frontend/Dockerfile
FROM node:24
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

RUN chown -R node:node /usr/src/app/node_modules
COPY . .
EXPOSE 4200
