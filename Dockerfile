FROM --platform=linux/arm64 node:22.8.0
LABEL authors="Phonyc"

WORKDIR /app

COPY package*.json /app
RUN npm install
RUN npm install chromedriver

RUN apt-get update && apt-get install -y \
    wget \
    unzip \
    chromium-browser \
    && rm -rf /var/lib/apt/lists/*

# Install ChromeDriver
RUN CHROMEDRIVER_VERSION=`curl -sS chromedriver.storage.googleapis.com/LATEST_RELEASE` \
    && wget -q "https://chromedriver.storage.googleapis.com/${CHROMEDRIVER_VERSION}/chromedriver_linux64.zip" \
    && unzip chromedriver_linux64.zip \
    && mv chromedriver /usr/local/bin/ \
    && rm chromedriver_linux64.zip

COPY . /app

EXPOSE 3000
CMD ["node", "index.js"]