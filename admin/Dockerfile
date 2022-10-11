FROM node:14.19.0-alpine as builder

WORKDIR /var/lib/app/
COPY ./package.json ./
COPY ./src/ ./src
COPY ./public/ ./public
COPY . .

RUN yarn
RUN yarn build

FROM nginx:1.17.7

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /var/lib/app/build/ /var/www/