FROM --platform=linux/arm64 node:22.8.0
LABEL authors="Phonyc"

WORKDIR /app

COPY package*.json /app
RUN npm install
RUN npm install chromedriver

COPY . /app

EXPOSE 3000
CMD ["node", "index.js"]