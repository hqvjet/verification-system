import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Import useNavigate
import Web3 from "web3";
import ProductAuthenticity from '../../build-contracts/ProductAuthenticity.json';
import "./style.css";

export const Information = () => {
  const [contract, setContract] = useState(null); // Hợp đồng thông minh
  const [product, setProduct] = useState(null); // Thông tin sản phẩm
  const [qid, setQid] = useState('');
  const navigate = useNavigate(); // Khởi tạo hook điều hướng
  const location = useLocation();

  // Kết nối blockchain và hợp đồng thông minh
  useEffect(() => {
    async function loadBlockchainData() {
      const web3 = new Web3("http://localhost:9545"); // Kết nối với Ganache

      const networkId = 5777; // ID mạng blockchain
      const networkData = ProductAuthenticity.networks[networkId]; // Dữ liệu mạng của hợp đồng thông minh

      if (networkData) {
        const abi = ProductAuthenticity.abi; // ABI của hợp đồng
        const address = networkData.address; // Địa chỉ hợp đồng
        const contractInstance = new web3.eth.Contract(abi, address); // Tạo đối tượng hợp đồng
        setContract(contractInstance); // Lưu hợp đồng
      } else {
        alert("Hợp đồng thông minh chưa được triển khai trên mạng này.");
      }
    }
    const queryParams = new URLSearchParams(location.search);
    const qid = queryParams.get('id');
    setQid(qid);
    console.log('Gửi dữ liệu:', qid);

    loadBlockchainData();
  }, []);

    useEffect(() => {
        const getProduct = async () => {
          if (contract) {
            try {

              const result = await contract.methods.getProduct(qid).call();
              console.log("Raw product result:", result);

              // result sẽ là 1 array hoặc object key: 0,1,2,3
              const temp_product = {
                name: result[0],
                manufacturer: result[1],
                manufactureDate: result[2],
              };

              console.log("Queried product:", temp_product);
            setProduct(temp_product);

              // setQueriedProduct(product);
            } catch (error) {
              console.error('Error khi truy vấn sản phẩm:', error);
              alert('Không tìm thấy sản phẩm!');
            }
          }
        };

        getProduct();
    }, [contract]);




  const handleNavigateToBackHome = () => {
    navigate("/home"); // Điều hướng về trang Home
  };

  return (
    <div className="information">
      <div className="frame-wrapper">
        <div className="frame">
          <div className="group">
            <img
              className="back"
              alt="Back"
              src="https://c.animaapp.com/MwpduQAg/img/back.svg"
              onClick={handleNavigateToBackHome} // Gọi hàm điều hướng khi nhấn nút quay lại
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
                  <p className="supporting-text">{product?.name || "N/A"}</p>
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
                  <p className="supporting-text">{product?.manufactureDate || "N/A"}</p>
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
