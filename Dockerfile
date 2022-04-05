FROM node:alpine

ENV PATH /app/node_modules/.bin:$PATH
ENV NODE_ENV=production
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm ci
COPY server.js .
COPY .env .
COPY src ./src
COPY ssl ./ssl

CMD ["node", "server.js"]
