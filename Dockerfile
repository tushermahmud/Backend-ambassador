FROM node:19-alpine3.16

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8000

CMD npm run start:dev