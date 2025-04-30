import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Quagga from "@ericblade/quagga2";
import "./style.css";

export const Home = () => {
  const videoRef = useRef(null); // Tạo tham chiếu đến thẻ video
  const navigate = useNavigate(); // Khởi tạo hook điều hướng
  const [scannedCode, setScannedCode] = useState("");

  useEffect(() => {
    const startScanner = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ video: true });

        Quagga.init({
          inputStream: {
            type: "LiveStream",
            target: videoRef.current,
            constraints: {
              width: 276,
              height: 278,
              facingMode: "environment"
            }
          },
          decoder: {
            readers: ["code_128_reader", "ean_reader", "ean_8_reader", "upc_reader"]
          }
        }, (err) => {
          if (err) {
            console.error(err);
            return;
          }
          Quagga.start();
        });

        Quagga.onDetected((result) => {
          const code = result.codeResult.code;
          console.log("Scanned code:", code);
          setScannedCode(code);

          // Stop quagga and điều hướng
          Quagga.stop();
          navigate(`/information?id=${encodeURIComponent(code)}`);
        });

      } catch (error) {
        console.error("Camera access error:", error);
      }
    };

    startScanner();

    return () => {
      Quagga.stop();
    };
  }, [navigate]);

    const handleNavigateToInformation = () => {
        // Need to do scan action to get product id
        const product_id = "1";
        navigate(`/information?id=${encodeURIComponent(product_id)}`); // Điều hướng đến trang Information
    };
    const handleNavigateToAddProduct = () => {
        navigate("/addproduct"); // Điều hướng đến trang AddProduct
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
              {/* Thay thế div camera bằng video */}
              <div className="camera">
                <div
                  ref={videoRef}
                  // autoPlay
                  // playsInline
                  // muted
                  // style={{ width: "200px", height: "278px" }}
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
              <div className="add-product" >
              <img
                className="add-product-img"
                alt="Add Product"
                src="https://cdn-icons-png.flaticon.com/512/992/992651.png"
                onClick={handleNavigateToAddProduct} // Điều hướng khi click
              />
              </div>
              <div className="group-2">
                <div className="div-wrapper">
                  <div className="text-wrapper" onClick={handleNavigateToInformation}>Generate</div>
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
                  onClick={handleNavigateToInformation} // Điều hướng khi click
                />
            </div>

          </div>
          
        </div>
      </div>
    </div>
  );
};
