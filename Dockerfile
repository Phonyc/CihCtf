FROM --platform=arm64 selenium/standalone-chromium
LABEL authors="Phonyc"

# Set the working directory
WORKDIR /app

# Copy application files
COPY . /app

# Install Node.js dependencies
RUN apt-get update
RUN apt-get install -y nodejs
RUN apt-get install -y npm
RUN npm install

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["node", "index.js"]