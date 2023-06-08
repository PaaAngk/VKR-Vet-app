FROM node:18.7.0-alpine as builder
WORKDIR /app
COPY ./package.json ./
RUN npm i --force 
COPY . .
RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80