FROM node:16

WORKDIR /app/server

COPY package.json .
COPY yarn.lock .

RUN npm i yarn
RUN yarn install

COPY . .

CMD npm run start
