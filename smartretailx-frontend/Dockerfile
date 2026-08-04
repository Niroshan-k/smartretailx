FROM node:18-alpine

WORKDIR /app

COPY smartretailx-frontend/package.json ./
RUN npm install

COPY smartretailx-frontend /app

EXPOSE 3000

CMD ["npm", "run", "dev"]
