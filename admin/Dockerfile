FROM node:lts-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/admin
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .
RUN npm run build
EXPOSE 3001
RUN chown -R node /usr/src/admin
USER node
CMD ["npm", "start"]
