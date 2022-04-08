FROM node:alpine

ENV PATH /app/node_modules/.bin:$PATH
ENV NODE_ENV=production
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY server.js .env .env.production secrets.yml ./
COPY src ./src

CMD ["node", "server.js"]
