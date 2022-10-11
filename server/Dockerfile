FROM node:14.19.0-alpine
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
COPY .env.example .env
RUN npm install
RUN npm install typescript -g
COPY . .
RUN npm run build
CMD ["npm", "run", "start"]
