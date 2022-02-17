FROM node

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

RUN npm install --save-dev nodemon

COPY . ./

EXPOSE 8000

ENTRYPOINT [ "npm", "start" ]

CMD ["node", "index.js"]