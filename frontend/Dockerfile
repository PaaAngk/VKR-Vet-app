FROM node:19.5.0-alpine3.17 AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
 
# Copy the main application
COPY . ./
 
# Build the application
RUN npm run build --prod
 
#### Stage 2, use the compiled app, ready for production with Nginx
FROM nginx
 
COPY --from=build /app/dist/out/ /usr/share/nginx/html
COPY /nginx.conf /etc/nginx/conf.d/default.conf
 
EXPOSE 80
ENTRYPOINT ["nginx","-g","daemon off;"]