# Sử dụng Node.js image
FROM node:16

# Thiết lập thư mục làm việc
WORKDIR /app

# Cài đặt Truffle và các dependencies cần thiết
RUN npm install -g truffle

# Sao chép toàn bộ mã nguồn vào container
COPY . .

# Cài đặt các dependencies của dự án (nếu có package.json)
RUN npm install

# Lệnh để deploy contract (thay đổi nếu cần)
CMD ["truffle", "migrate", "--network", "rinkeby"]

