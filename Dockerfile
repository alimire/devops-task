# the base image
FROM node:18

WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

RUN npm install express-prom-bundle express dotenv

COPY . .

EXPOSE 3000

CMD [ "node", "app.js" ]

