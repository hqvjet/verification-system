FROM node:16

RUN apt-get update && apt-get install -y netcat
# Set working directory
WORKDIR /contracts

# Install Truffle globally
RUN npm install -g truffle

COPY . .

RUN chmod +x ./wait-for-ganache.sh

CMD ["sh"]
