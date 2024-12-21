FROM --platform=linux/arm64 selenium/standalone-chromium:latest
LABEL authors="Phonyc"

# Set the working directory
WORKDIR /app

# Copy application files
COPY . /app

# Install Node.js dependencies
RUN sudo apt-get update
RUN sudo apt-get install -y nodejs
RUN sudo apt-get install -y npm
RUN sudo npm install

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["node", "index.js"]