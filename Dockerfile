# Stage 1: Build
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source code
COPY . .

# Compile TypeScript
RUN npm run build

# Stage 2: Production
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy only the compiled files and necessary dependencies
COPY --from=builder /app/package*.json ./
RUN npm install --only=production

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/src/views ./dist/views
COPY --from=builder /app/public ./dist/public

# Expose the application port
EXPOSE 3000

# Set environment variables (can be overridden in docker-compose)
ENV NODE_ENV=production

# Start the application
CMD ["node", "dist/server.js"]