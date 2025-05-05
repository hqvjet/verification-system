FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Open port 3000
EXPOSE 3000
ENV HOST=0.0.0.0

CMD ["npm", "start"]
