import React from "react";
import { mockProductData } from "../mookdata"; // Import mock data
import "./style.css";

export const Information = () => {
  // Lọc sản phẩm có mã P001
  const product = mockProductData.find((item) => item.productId === "P001");

  return (
    <div className="information">
      <div className="frame-wrapper">
        <div className="frame">
          <div className="group">
            <img
              className="back"
              alt="Back"
              src="https://c.animaapp.com/MwpduQAg/img/back.svg"
            />

            <div className="text-wrapper">Result</div>

            <img
              className="share"
              alt="Share"
              src="https://c.animaapp.com/MwpduQAg/img/share.svg"
            />
          </div>

          <div className="div">
            <div className="interaction-states">
              {/* Hiển thị tên sản phẩm */}
              <div className="list-item-container">
                <img
                  className="vector"
                  alt="Vector"
                  src="https://c.animaapp.com/MwpduQAg/img/vector-2.svg"
                />

                <div className="text-container">
                  <div className="headline">Name Product</div>
                  <p className="supporting-text">{product?.productName || "N/A"}</p>
                </div>
              </div>

              {/* Hiển thị ngày sản xuất */}
              <div className="list-item-container-2">
                <img
                  className="vector"
                  alt="Vector"
                  src="https://c.animaapp.com/MwpduQAg/img/vector-2.svg"
                />

                <div className="text-container">
                  <div className="headline-2">Date of manufacture</div>
                  <p className="supporting-text">{product?.productionDate || "N/A"}</p>
                </div>
              </div>

              {/* Hiển thị nhà sản xuất */}
              <div className="list-item-container-3">
                <img
                  className="vector"
                  alt="Vector"
                  src="https://c.animaapp.com/MwpduQAg/img/vector-2.svg"
                />

                <div className="text-container">
                  <div className="headline-2">Manufacturer</div>
                  <p className="supporting-text">{product?.manufacturer || "N/A"}</p>
                </div>
              </div>
            </div>

            <div className="text-wrapper-2">Information Product</div>
          </div>

          <div className="overlap-group-wrapper">
            <div className="overlap-group">
              <div className="rectangle" />

              <div className="group-2">
                <div className="div-wrapper">
                  <div className="text-wrapper-3">Generate</div>
                </div>

                <div className="group-3">
                  <div className="text-wrapper-3">History</div>
                </div>
              </div>

              <img
                className="ic-twotone-history"
                alt="Ic twotone history"
                src="https://c.animaapp.com/MwpduQAg/img/ic-twotone-history.svg"
              />

              <img
                className="ic-round-qr-code"
                alt="Ic round qr code"
                src="https://c.animaapp.com/MwpduQAg/img/ic-round-qr-code-2.svg"
              />

              <img
                className="btn-camera"
                alt="Btn camera"
                src="https://c.animaapp.com/MwpduQAg/img/btn-camera@2x.png"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
