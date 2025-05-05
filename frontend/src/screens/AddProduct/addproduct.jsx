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
  const [showDownload, setShowDownload] = useState(false);

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
          format: "UPC",
          lineColor: "#000",
          width: 2,
          height: 60,
          displayValue: false,
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

      // Tạo mã sản phẩm 11 chữ số ngẫu nhiên
      let randomId = Math.floor(Math.random() * 100000000000).toString().padStart(11, '0'); // Đảm bảo có 11 chữ số

      // Tính toán checksum cho UPC-A
      let sumOdd = 0, sumEven = 0;

      // Duyệt qua từng chữ số để tính tổng
      for (let i = 0; i < 11; i++) {
        let digit = parseInt(randomId[i]);
        if (i % 2 === 0) {
          sumOdd += digit; // Chữ số ở vị trí lẻ (bắt đầu từ 0)
        } else {
          sumEven += digit; // Chữ số ở vị trí chẵn
        }
      }

      // Tính tổng kiểm tra
      let total = sumOdd * 3 + sumEven;
      let remainder = total % 10;
      let checksum = remainder === 0 ? 0 : 10 - remainder;

      // Thêm checksum vào cuối mã sản phẩm để tạo mã UPC-A
      let upc = randomId + checksum;

      // Cập nhật mã sản phẩm
      setProductId(upc); // Cập nhật với UPC hợp lệ

    if (contract) {
      try {
        await contract.methods.addProduct(
          name,
          manufacturer,
          Math.floor(new Date(manufactureDate).getTime() / 1000),
          upc,
        ).send({ from: account, gas: 3000000, gasPrice: '20000000000' });

        alert(`Thêm sản phẩm thành công với ID: ${upc}`);
        // Có thể điều hướng hoặc hiển thị QR/barcode ở đây
      } catch (error) {
        console.error("Giao dịch thất bại:", error);
        alert("Thêm sản phẩm thất bại.");
      }
    }
  };


    const handleDownloadBarcode = () => {
      const svgElement = barcodeRef.current;
      if (!svgElement) return;

      const canvas = document.createElement("canvas");
      const svgString = new XMLSerializer().serializeToString(svgElement);
      const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(svgBlob);

      const img = new Image();
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        URL.revokeObjectURL(url);

        const pngUrl = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.download = `${productId}.png`;
        link.href = pngUrl;
        link.click();
      };
      img.src = url;
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
            {productId && (
              <div className="frame-7" style={{ textAlign: "center", marginTop: "20px" }}
                onMouseEnter={() => setShowDownload(true)}
                onMouseLeave={() => setShowDownload(false)}
              >
                <h4>Barcode:</h4>
                <svg ref={barcodeRef}/>
                {showDownload && (
                  <button
                    onClick={handleDownloadBarcode}
                    className="btn-download"
                  >
                    Tải mã vạch
                  </button>)}

              </div>
            )}

            {/* Nút thêm sản phẩm */}
            <button className="btn-start" onClick={handleAddProduct}>
              <div className="text-wrapper-3">Add</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
