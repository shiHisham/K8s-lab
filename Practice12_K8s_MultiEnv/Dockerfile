FROM node:18-alpine
WORKDIR /app
COPY app/server.js .
RUN npm install express
EXPOSE 3000
CMD ["node", "server.js"]
