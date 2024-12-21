FROM --platform=linux/arm64 node:22.8.0
LABEL authors="Phonyc"

WORKDIR /app

COPY package*.json /app
RUN npm install
RUN apt-get update && apt-get install -y \
    wget \
    gnupg \
    unzip \
    firefox-esr \
    && wget -O /tmp/geckodriver.tar.gz https://github.com/mozilla/geckodriver/releases/download/v0.35.0/geckodriver-v0.35.0-linux-aarch64.tar.gz \
    && tar -xzf /tmp/geckodriver.tar.gz -C /usr/local/bin/ \
    && rm /tmp/geckodriver.tar.gz \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

COPY . /app

EXPOSE 3000
CMD ["node", "index.js"]