FROM node:latest
ENV NODE_ENV=development
WORKDIR /usr/src/app
COPY ["package.json", "yarn.lock", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN yarn install
COPY . .
EXPOSE 4001
CMD ["npm", "start"]
