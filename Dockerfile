FROM node:12
WORKDIR /usr/src/mutant
COPY ./package.json .
RUN npm install --only=prod