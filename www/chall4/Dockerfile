FROM --platform=linux/arm64 node:22.8.0

WORKDIR /app

COPY package*.json /app
RUN npm install

COPY . /app

EXPOSE 3000
CMD ["node", "monsuperserveur.js"]

