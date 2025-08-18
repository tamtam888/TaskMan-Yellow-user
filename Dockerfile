# Step 1: Build the React app
FROM node:18-alpine AS builder
WORKDIR /app

# Install dependencies (locked if package-lock.json exists)
COPY package.json package-lock.json ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build

# Step 2: Serve the built app with Nginx
FROM nginx:alpine

# Clean default static files
RUN rm -rf /usr/share/nginx/html/*

# Copy build output from previous stage
COPY --from=builder /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]

