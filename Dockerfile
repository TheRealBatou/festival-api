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

# Port the container listens to
EXPOSE 3000

# Start App
CMD ["npm", "run", "start"]
