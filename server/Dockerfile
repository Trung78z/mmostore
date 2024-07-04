FROM node:lts-alpine
ENV NODE_ENV=development
WORKDIR /usr/src/server
COPY package.json ./
# COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --development --silent && mv node_modules ../
# RUN npm install --production
# RUN npm install -g nodemon ts-node typescript
# RUN npm uninstall bcrypt
# RUN npm install bcrypt

COPY . .
EXPOSE 8080
RUN chown -R node /usr/src/server
USER node
CMD ["npm", "run","dev"]
