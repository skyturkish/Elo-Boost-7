FROM node:18.15-alpine3.17

WORKDIR /app
ADD package.json package-lock.json ./
RUN npm install

ADD .browserslistrc .
ADD .eslintrc.js .
ADD .prettierrc .
ADD jsconfig.json .
ADD vite.config.js .

COPY src ./src

RUN npm run build

FROM node:alpine

WORKDIR /app

RUN npm install -g serve

COPY --from=BUILDER /app/dist ./

EXPOSE 5000

CMD [ "npm" , "run" , "dev","--", "--host", "0.0.0.0"]