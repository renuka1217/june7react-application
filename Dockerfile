FROM node:24-alpine

WORKDIR /app

COPY package*.json .

RUN npm install
RUN chmod +x node_modules/.bin/vite

COPY . .

EXPOSE 5173

CMD [ "npm","run","dev" ]


