FROM --platform=linux/arm64 seleniarm/standalone-chrome:latest
LABEL authors="Phonyc"

# Set the working directory
WORKDIR /app

# Copy application files
COPY . /app

# Install Node.js dependencies
RUN apt-get update && apt-get install -y nodejs npm
RUN npm install

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["node", "index.js"]