# Step 1: Use an official Node.js image as a base
FROM node:18-alpine AS builder

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json (or yarn.lock) first to install dependencies
COPY package*.json ./

# Step 4: Install the dependencies
RUN npm install --production --legacy-peer-deps

# Step 5: Copy the rest of the application code
COPY . .

# Step 6: Build the NestJS application
RUN npm run build

# Step 7: Create a new image for the runtime environment
FROM node:18-alpine

# Step 8: Set the working directory inside the container
WORKDIR /app

# Step 9: Copy only the necessary files from the builder image (the build output)
COPY --from=builder /app/dist /app/dist

# Step 10: Copy the package.json to ensure the dependencies are available in the runtime image
COPY --from=builder /app/package*.json ./

# Step 11: Install production dependencies (only the ones required for running)
RUN npm install --production --legacy-peer-deps

# Step 12: Expose the port that the NestJS app will run on (default is 3000)
EXPOSE 3000

# Step 13: Run the application when the container starts
CMD ["node", "dist/main"]