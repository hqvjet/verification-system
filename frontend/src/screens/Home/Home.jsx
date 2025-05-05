import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BarcodeScanner from "react-qr-barcode-scanner/dist/BarcodeScanner.js"; // Import BarcodeScannerComponent
import "./style.css";

export const Home = () => {
  const navigate = useNavigate(); // Khởi tạo hook điều hướng
  const [scannedCode, setScannedCode] = useState(""); // State để lưu mã quét

  const handleScan = (result) => {
    if (result) {
      const codeResult = result.text; // Lấy kết quả mã quét
      console.log("Scanned code:", codeResult);
      setScannedCode(codeResult); // Lưu mã vào state
      navigate(`/information?id=${encodeURIComponent(codeResult)}`); // Điều hướng đến trang thông tin sản phẩm
    }
  };

  const handleError = (err) => {
    console.error("Barcode scanning error:", err);
  };

  return (
    <div className="home">
      <div className="frame-wrapper">
        <div className="frame">
          <div className="group">
            <div className="overlap-group">
              <div className="div">
                <img
                  className="clarity-image"
                  alt="Clarity"
                  src="https://c.animaapp.com/c8N46bgw/img/clarity-image-gallery-solid.svg"
                />
                <img
                  className="vector"
                  alt="Vector"
                  src="https://c.animaapp.com/c8N46bgw/img/vector.svg"
                />
                <img
                  className="material-symbols"
                  alt="Material symbols"
                  src="https://c.animaapp.com/c8N46bgw/img/material-symbols-flip-camera-ios.svg"
                />
              </div>
            </div>
          </div>

          <div className="place-scan">
            <div className="overlap">
              <div className="camera">
                {/* Sử dụng BarcodeScannerComponent thay cho video */}
                <BarcodeScanner
                  onUpdate={(err, result) => {
                    if (result) {
                      handleScan(result);
                    }
                    if (err) {
                      handleError(err);
                    }
                  }}
                  facingMode="environment" // Chế độ camera phía sau
                  // videoStyle={{ width: "100%", height: "100%" }}
                  barcodeFormat={[
                    "code_128_reader",
                    "ean_reader",
                    "ean_8_reader",
                    "upc_reader",
                    // Thêm các định dạng khác nếu cần
                  ]}
                />
              </div>

              <img
                className="img"
                alt="Group"
                src="https://c.animaapp.com/c8N46bgw/img/group-41@2x.png"
              />
            </div>
          </div>

          <div className="overlap-wrapper">
            <div className="overlap-2">
              <div className="rectangle" />
              <div className="add-product">
                <img
                  className="add-product-img"
                  alt="Add Product"
                  src="https://cdn-icons-png.flaticon.com/512/992/992651.png"
                  onClick={() => navigate("/addproduct")}
                />
              </div>
              <div className="group-2">
                <div className="div-wrapper">
                  <div className="text-wrapper" onClick={() => navigate(`/information?id=${encodeURIComponent(scannedCode)}`)}>
                    Generate
                  </div>
                </div>

                <div className="group-3">
                  <div className="text-wrapper">History</div>
                </div>
              </div>

              <img
                className="ic-twotone-history"
                alt="Ic twotone history"
                src="https://c.animaapp.com/c8N46bgw/img/ic-twotone-history.svg"
              />

              <img
                className="ic-round-qr-code"
                alt="Ic round qr code"
                src="https://c.animaapp.com/c8N46bgw/img/ic-round-qr-code-2.svg"
              />

              <img
                className="btn-camera"
                alt="Btn camera"
                src="https://c.animaapp.com/c8N46bgw/img/btn-camera@2x.png"
                onClick={() => navigate(`/information?id=${encodeURIComponent(scannedCode)}`)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

