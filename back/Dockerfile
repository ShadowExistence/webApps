FROM node:14-alpine3.12

WORKDIR /app

COPY package*.json ./

RUN npm install

# Copy from host dir to container dir
COPY . . 


# Expose port 3000 from node
EXPOSE 3000

CMD npm start