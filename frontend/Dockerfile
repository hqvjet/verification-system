# Bước 1: Sử dụng node image
FROM node:16 AS build

# Thiết lập thư mục làm việc
WORKDIR /app

# Sao chép package.json và package-lock.json vào container
COPY package*.json ./

# Cài đặt các dependencies
RUN npm install

# Sao chép toàn bộ mã nguồn vào container
COPY . .

# Build ứng dụng React
RUN npm run build

# Bước 2: Chạy ứng dụng React trên Nginx
FROM nginx:alpine

# Sao chép các file build của React vào thư mục public của Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Mở port 80
EXPOSE 80

# Chạy Nginx
CMD ["nginx", "-g", "daemon off;"]

