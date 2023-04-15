FROM node:18.15-alpine3.17 AS BUILDER

WORKDIR /src

ADD package.json package-lock.json ./
RUN npm install --build-from-source

FROM node:alpine

WORKDIR /src

COPY --from=BUILDER /src/node_modules ./node_modules

ENV NODE_ENV=production

COPY package.json ./
COPY src ./src
COPY bin ./bin

EXPOSE 3000

CMD [ "npm", "start" ]