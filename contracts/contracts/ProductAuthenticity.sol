// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract ProductAuthenticity {
    struct Product {
        string name;
        string manufacturer;
        uint256 manufactureDate;
        string productId;
    }

    // Mapping từ mã sản phẩm đến thông tin sản phẩm
    mapping(string => Product) private products;

    // Event khi sản phẩm mới được thêm
    event ProductAdded(string indexed productId, string name, string manufacturer, uint256 manufactureDate);

    // Hàm thêm sản phẩm mới
    function addProduct(
        string memory _name,
        string memory _manufacturer,
        uint256 _manufactureDate,
        string memory _productId
    ) public {
        require(bytes(products[_productId].productId).length == 0, "Product already exists");

        products[_productId] = Product({
            name: _name,
            manufacturer: _manufacturer,
            manufactureDate: _manufactureDate,
            productId: _productId
        });

        emit ProductAdded(_productId, _name, _manufacturer, _manufactureDate);
    }

    // Hàm truy vấn thông tin sản phẩm
    function getProduct(string memory _productId) public view returns (
        string memory name,
        string memory manufacturer,
        uint256 manufactureDate,
        string memory productId
    ) {
        require(bytes(products[_productId].productId).length != 0, "Product does not exist");

        Product memory p = products[_productId];
        return (p.name, p.manufacturer, p.manufactureDate, p.productId);
    }
}

