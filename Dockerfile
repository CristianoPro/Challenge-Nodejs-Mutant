FROM node:12
WORKDIR /usr/src/mutant
COPY ./package.json .
RUN npm install --only=prod
COPY ./dist ./dist
EXPOSE 8080
CMD npm start