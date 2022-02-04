FROM node:alpine

ENV PATH /app/node_modules/.bin:$PATH
ENV NODE_ENV=production

WORKDIR /app

COPY . .
RUN npm ci

CMD ["node", "server.js"]
