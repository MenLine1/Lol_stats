FROM node:16

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm rebuild bcrypt --build-from-source

CMD ["npm", "start"]
