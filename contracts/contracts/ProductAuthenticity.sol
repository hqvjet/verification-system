// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;
contract ProductManager {
    // Cấu trúc lưu trữ thông tin sản phẩm
    struct Product {
        string name;
        string manufacturer;
        string productionDate;
        string productId;
    }
    
    // Mapping để lưu trữ sản phẩm theo ID
    mapping(string => Product) public products;
    
    // Mảng lưu trữ tất cả các productId
    string[] public productIds;
    
    // Sự kiện khi thêm sản phẩm mới
    event ProductAdded(
        string name,
        string manufacturer,
        string productionDate,
        string productId
    );
    
    // Thêm sản phẩm mới
    function addProduct(
        string memory _name,
        string memory _manufacturer,
        string memory _productionDate,
        string memory _productId
    ) public {
        // Kiểm tra xem productId đã tồn tại chưa
        require(bytes(products[_productId].productId).length == 0, "Product ID already exists");
        
        // Tạo sản phẩm mới
        Product memory newProduct = Product({
            name: _name,
            manufacturer: _manufacturer,
            productionDate: _productionDate,
            productId: _productId
        });
        
        // Lưu vào mapping
        products[_productId] = newProduct;
        
        // Thêm vào mảng productIds
        productIds.push(_productId);
        
        // Kích hoạt sự kiện
        emit ProductAdded(_name, _manufacturer, _productionDate, _productId);
    }
    
    // Lấy thông tin sản phẩm
    function getProduct(string memory _productId) public view returns (
        string memory,
        string memory,
        string memory,
        string memory
    ) {
        Product memory product = products[_productId];
        require(bytes(product.productId).length != 0, "Product does not exist");
        
        return (
            product.name,
            product.manufacturer,
            product.productionDate,
            product.productId
        );
    }
    
    // Lấy tổng số sản phẩm
    function getProductCount() public view returns (uint) {
        return productIds.length;
    }
}

