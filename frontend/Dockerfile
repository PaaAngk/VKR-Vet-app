FROM node:16.20-bullseye-slim as builder
WORKDIR /app
COPY ./package.json ./
RUN npm i --force 
COPY . .
RUN npm run build

FROM nginx

COPY --from=builder /app/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80