import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./style.css";

export const Start = () => {
  const navigate = useNavigate(); // Khởi tạo hook điều hướng

  const handleNavigate = () => {
    navigate("/home"); // Điều hướng đến trang Home
  };

  return (
    <div className="start">
      <div className="div">
        <div className="group">
          <img
            className="search"
            alt="Search"
            src="https://c.animaapp.com/XrepZ9E0/img/search.svg"
          />

          <div className="text-wrapper">Verification Product</div>
        </div>

        <div className="overlap-group">
          <div className="text-wrapper-2">Get Started</div>

          <p className="p">
            Traceability of product information to bring your quality product.
            Say no to counterfeit good
          </p>
        </div>

        {/* Gắn sự kiện điều hướng */}
        <div className="btn-start" onClick={handleNavigate}>
          <div className="text-wrapper-3">Let’s go</div>
        </div>
      </div>
    </div>
  );
};