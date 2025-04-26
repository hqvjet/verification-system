FROM node:16

RUN apt-get update && apt-get install -y netcat
# Set working directory
WORKDIR /app

# Install Truffle globally
RUN npm install -g truffle

# Copy rest of the code
COPY . .

# Make wait-for-ganache.sh executable (nếu bạn dùng wait script)
RUN chmod +x ./wait-for-ganache.sh

# Default command (overridden by docker-compose)
CMD ["truffle", "migrate", "--reset", "--network", "development"]
