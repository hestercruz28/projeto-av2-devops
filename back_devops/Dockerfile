FROM node:14

WORKDIR /index.js

COPY package*.json ./

RUN npm install
RUN npm install express
RUN npm install mysql
RUN npm install cors


COPY . .

EXPOSE 3001

CMD ["node", "index.js"]