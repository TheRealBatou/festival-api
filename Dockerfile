# Image
FROM node:20

# work dir
WORKDIR /app

# Copy and install dependencies
COPY package*.json ./
RUN npm install

# Copy code
COPY . .

# Compile TypeScript
RUN npx tsc

# Start App
CMD ["npm", "run", "start"]
