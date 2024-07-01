FROM node:lts-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/client
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../ 
COPY . .
RUN npm run build
EXPOSE 3000
RUN chown -R node /usr/src/client
USER node
# CMD ["npm", "run","dev"]
CMD ["npm", "start"]
