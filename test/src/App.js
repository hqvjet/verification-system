import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import ProductAuthenticity from './build-contracts/ProductAuthenticity.json';

function App() {
  const [account, setAccount] = useState('');
  const [contract, setContract] = useState(null);

  const [name, setName] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [manufactureDate, setManufactureDate] = useState('');
  const [productId, setProductId] = useState('');
  const [queriedProduct, setQueriedProduct] = useState(null);
  const [queryId, setQueryId] = useState('');

  useEffect(() => {
    async function loadBlockchainData() {
      const web3 = new Web3('http://localhost:9545');

      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);

      const networkId = 5777
      const networkData = ProductAuthenticity.networks[networkId];
      console.log("Đang connect vào networkId:", networkId);

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

    const addProduct = async () => {
      if (contract) {
        try {
          const timestamp = Math.floor(new Date(manufactureDate).getTime() / 1000);
          console.log('Gửi dữ liệu:', { name, manufacturer, timestamp, productId });

        const receipt = await contract.methods.addProduct(name, manufacturer, timestamp, productId)
          .send({ from: account, gas: 3000000, gasPrice: '20000000000' });

      console.log('Receipt:', receipt);

          alert('Thêm sản phẩm thành công!');
        } catch (error) {
          console.error('Error details:', error);
          alert('Lỗi thêm sản phẩm!');
        }
      }
    };

const getProduct = async () => {
  if (contract) {
    try {
      const result = await contract.methods.getProduct(queryId).call();
      console.log("Raw product result:", result);

      // result sẽ là 1 array hoặc object key: 0,1,2,3
      const product = {
        name: result[0],
        manufacturer: result[1],
        manufactureDate: result[2],
        productId: result[3]
      };

      setQueriedProduct(product);
    } catch (error) {
      console.error('Error khi truy vấn sản phẩm:', error);
      alert('Không tìm thấy sản phẩm!');
    }
  }
};

  return (
    <div style={{ padding: '20px' }}>
      <h2>Connected Account: {account}</h2>

      <h3>Thêm sản phẩm mới</h3>
      <input type="text" placeholder="Tên sản phẩm" value={name} onChange={(e) => setName(e.target.value)} /><br />
      <input type="text" placeholder="Nhà sản xuất" value={manufacturer} onChange={(e) => setManufacturer(e.target.value)} /><br />
      <input type="date" placeholder="Ngày sản xuất" value={manufactureDate} onChange={(e) => setManufactureDate(e.target.value)} /><br />
      <input type="text" placeholder="Mã sản phẩm" value={productId} onChange={(e) => setProductId(e.target.value)} /><br />
      <button onClick={addProduct}>Thêm sản phẩm</button>

      <hr />

      <h3>Truy vấn sản phẩm</h3>
      <input type="text" placeholder="Nhập mã sản phẩm" value={queryId} onChange={(e) => setQueryId(e.target.value)} /><br />
      <button onClick={getProduct}>Truy vấn</button>

      {queriedProduct && (
        <div>
          <h4>Thông tin sản phẩm:</h4>
          <p><strong>Tên:</strong> {queriedProduct.name}</p>
          <p><strong>Nhà sản xuất:</strong> {queriedProduct.manufacturer}</p>
          <p><strong>Ngày sản xuất:</strong> {new Date(Number(queriedProduct.manufactureDate) * 1000).toLocaleString()}</p>
          <p><strong>Mã sản phẩm:</strong> {queriedProduct.productId}</p>
        </div>
      )}
    </div>
  );
}

export default App;

