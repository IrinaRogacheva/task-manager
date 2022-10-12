FROM node:16

WORKDIR /app/client

COPY package.json .
COPY yarn.lock .

RUN npm i yarn
RUN yarn install

COPY . .

CMD npm start