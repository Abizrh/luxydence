FROM node:16.17.0

RUN npm install -g pnpm

WORKDIR /app

COPY package*.json ./

RUN pnpm install

COPY client/ ./client
COPY server/ ./server

EXPOSE 5173
EXPOSE 8000

CMD ["pnpm", "dev"]