import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./style.css";

export const AddProduct = () => {
    const navigate = useNavigate(); // Khởi tạo hook điều hướng
    const handleNavigateToBackHome = () => {
        navigate("/home"); // Điều hướng về trang Home
        };
  return (
    <div className="add-product" data-model-id="12:4">
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
            <div className="frame-3">
              <div className="text-wrapper-2">Name Product</div>

              <div className="frame-4" />
            </div>

            <div className="frame-5">
              <div className="text-wrapper-2">Manufacture Product</div>

              <div className="frame-4" />
            </div>

            <div className="frame-6">
              <div className="text-wrapper-2">Date of Manufacture Product</div>

              <div className="frame-4" />
            </div>

            <div className="frame-7">
              <div className="text-wrapper-2">Code Product</div>

              <div className="frame-4" />
            </div>

            <button className="btn-start">
              <div className="text-wrapper-3">Add</div>
            </button>
          </div>

          <div className="overlap-group-wrapper">
            <div className="overlap-group">
              <div className="rectangle" />

              <div className="group-2">
                <div className="group-3">
                  <div className="text-wrapper-4">Generate</div>
                </div>

                <div className="group-4">
                  <div className="text-wrapper-4">History</div>
                </div>
              </div>

              <img
                className="ic-twotone-history"
                alt="Ic twotone history"
                src="https://c.animaapp.com/MuC7sd4b/img/ic-twotone-history.svg"
              />

              <img
                className="ic-round-qr-code"
                alt="Ic round qr code"
                src="https://c.animaapp.com/MuC7sd4b/img/ic-round-qr-code-2.svg"
              />

              <img
                className="btn-camera"
                alt="Btn camera"
                src="https://c.animaapp.com/MuC7sd4b/img/btn-camera@2x.png"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
