FROM node:16

RUN apt-get update && apt-get install -y netcat
# Set working directory
WORKDIR /app

# Install Truffle globally
RUN npm install -g truffle

# Copy rest of the code
COPY . .

RUN chmod +x ./wait-for-ganache.sh

CMD ['sh']
