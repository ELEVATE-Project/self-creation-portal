# Stage 1: Build the Angular app
FROM node:20-alpine AS build
WORKDIR /app

# Copy configuration files and install dependencies
COPY package*.json ./
RUN npm install --force

# Copy the rest of the application code and build
COPY . .
RUN npx ng build lib-shared-modules

# Copy the rest of the application code and build
COPY . .
RUN npx ng build lib-project

# Copy the rest of the application code and build
COPY . .
RUN npx ng build lib-observation

# Copy the rest of the application code and build
COPY . .
RUN npx ng build lib-observation-with-rubrics

# Copy the rest of the application code and build
COPY . .
RUN npx ng build program-with-rollout

# Copy the rest of the application code and build
COPY . .
RUN npx ng build lib-survey

COPY environments/environment.ts ./www/assets/env/env.js

# Copy the rest of the application code and build
COPY . .
RUN npm run build self-creation-portal --configuration=production

# Stage 2: Serve the app with Nginx
FROM nginx:stable-alpine
# Copy the build output to replace the default nginx contents.
# Replace 'your-app-name' with the name found in your angular.json
COPY --from=build /app/dist/your-app-name/browser /usr/share/nginx/html

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
