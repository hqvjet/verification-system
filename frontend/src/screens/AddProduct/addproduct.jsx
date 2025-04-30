import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import JsBarcode from "jsbarcode";
import Web3 from 'web3';
import ProductAuthenticity from '../../build-contracts/ProductAuthenticity.json';
import "./style.css";

export const AddProduct = () => {
  const navigate = useNavigate();
  const barcodeRef = useRef(null);
  const [account, setAccount] = useState('');
  const [contract, setContract] = useState(null);

  const [name, setName] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [manufactureDate, setManufactureDate] = useState('');
  const [productId, setProductId] = useState('');

  useEffect(() => {
    async function loadBlockchainData() {
      const web3 = new Web3('http://localhost:9545');

      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);

      const networkId = 5777;
      const networkData = ProductAuthenticity.networks[networkId];

      if (networkData) {
        const abi = ProductAuthenticity.abi;
        const address = networkData.address;
        const contractInstance = new web3.eth.Contract(abi, address);
        setContract(contractInstance);
      } else {
        alert('Smart contract chưa deploy vào network này.');
      }
    }

    loadBlockchainData();
  }, []);

    useEffect(() => {
      if (productId && barcodeRef.current) {
        JsBarcode(barcodeRef.current, productId, {
          format: "CODE128",
          lineColor: "#000",
          width: 2,
          height: 60,
          displayValue: true,
        });
      }
    }, [productId]);


  const handleNavigateToBackHome = () => {
    navigate("/home");
  };

  const handleAddProduct = async () => {
    if (!name || !manufacturer || !manufactureDate) {
      alert("Vui lòng điền đầy đủ thông tin sản phẩm.");
      return;
    }

    // Tạo product ID ngẫu nhiên (có thể thay bằng hash nếu cần)
    const generatedId = `PROD-${Date.now()}-${Math.floor(Math.random() * 100000)}`;
    setProductId(generatedId);

    if (contract) {
      try {
        await contract.methods.addProduct(
          name,
          manufacturer,
          Math.floor(new Date(manufactureDate).getTime() / 1000),
          generatedId,
        ).send({ from: account, gas: 3000000, gasPrice: '20000000000' });

        alert(`Thêm sản phẩm thành công với ID: ${generatedId}`);
        // Có thể điều hướng hoặc hiển thị QR/barcode ở đây
      } catch (error) {
        console.error("Giao dịch thất bại:", error);
        alert("Thêm sản phẩm thất bại.");
      }
    }
  };

  return (
    <div className="add-product">
      <div className="frame-wrapper">
        <div className="frame">
          <div className="group">
            <div className="back">
              <img
                className="vector"
                alt="Vector"
                src="https://c.animaapp.com/MuC7sd4b/img/vector.svg"
                onClick={handleNavigateToBackHome}
              />
            </div>
            <div className="text-wrapper">Add Product</div>
            <img
              className="share"
              alt="Share"
              src="https://c.animaapp.com/MuC7sd4b/img/share.svg"
            />
          </div>

          <div className="div-wrapper">
            <div className="div">Information Product</div>
          </div>

          <div className="frame-2">
            {/* Tên sản phẩm */}
            <div className="frame-3">
              <div className="text-wrapper-2">Name Product</div>
              <input
                className="frame-4"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter product name"
              />
            </div>

            {/* Nhà sản xuất */}
            <div className="frame-5">
              <div className="text-wrapper-2">Manufacturer</div>
              <input
                className="frame-4"
                type="text"
                value={manufacturer}
                onChange={(e) => setManufacturer(e.target.value)}
                placeholder="Enter manufacturer"
              />
            </div>

            {/* Ngày sản xuất */}
            <div className="frame-6">
              <div className="text-wrapper-2">Date of Manufacture Product</div>
              <input
                className="frame-4"
                type="date"
                value={manufactureDate}
                onChange={(e) => setManufactureDate(e.target.value)}
              />
            </div>

            {/* Nút thêm sản phẩm */}
            <button className="btn-start" onClick={handleAddProduct}>
              <div className="text-wrapper-3">Add</div>
            </button>
            {productId && (
              <div style={{ marginTop: "30px", textAlign: "center" }}>
                <h4>Mã vạch sản phẩm:</h4>
                <svg ref={barcodeRef}></svg>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
