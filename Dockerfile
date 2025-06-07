FROM node:24-alpine

# Install necessary packages
RUN apk add --no-cache bash

WORKDIR /app

# Copy and install dependencies
COPY package*.json ./
RUN npm install

# Ensure vite binary is executable
RUN chmod +x node_modules/.bin/vite

# Copy remaining files
COPY . .

EXPOSE 5173

# Run using bash to avoid "sh: permission denied"
CMD [ "bash", "-c", "npm run dev" ]
