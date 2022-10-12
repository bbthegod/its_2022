FROM node:14.19.0-alpine
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
COPY .env.example .env
RUN yarn
RUN yarn typescript -g
COPY . .
RUN yarn build
CMD ["yarn", "start"]
