FROM node:18.15-alpine3.17

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD [ "npm" , "run" , "dev","--", "--host", "0.0.0.0"]
