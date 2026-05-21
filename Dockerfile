# Stage 1: Build the application
FROM node:24-alpine AS build
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install -g npm@11.14.1
RUN corepack enable
RUN curl -fsSL https://get.pnpm.io/install.sh | sh -
RUN npm install --legacy-peer-deps

# Copy the rest of the source code and build the app
COPY . .
RUN export BASE_PATH="/" && export PORT=3000 && npm run build

# Stage 2: Serve the application with Nginx
FROM nginx:alpine
# Copy the built assets from the build stage to Nginx's default directory
COPY --from=build /app/dist/public/ /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]