FROM node:24-alpine

# Install required dependencies
RUN apk add --no-cache dumb-init

WORKDIR /app

# Copy and install dependencies
COPY package*.json ./
RUN npm install

# Ensure vite is executable
RUN chmod +x node_modules/.bin/vite

# Copy app code
COPY . .

EXPOSE 5173

# Use dumb-init for better signal handling and shell compatibility
ENTRYPOINT ["/usr/bin/dumb-init", "--"]

# Start app
CMD ["npm", "run", "dev"]
