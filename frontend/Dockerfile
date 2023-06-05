FROM node:16-alpine AS builder

WORKDIR /usr/src/app
COPY package.json package-lock.json ./

RUN npm install --force
COPY . .
RUN npm run build

### STAGE 2: Run ###
FROM nginx:1.15.8-alpine

COPY --from=builder /usr/src/app/dist/myapp/ /usr/share/nginx/html
COPY --from=builder /usr/src/app/docker/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# EXPOSE 80
# ENTRYPOINT ["nginx","-g","daemon off;"]