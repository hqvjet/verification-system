module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,       // Cổng mặc định Ganache GUI
      network_id: "*",  // Kết nối với bất kỳ network id nào
    },
  },
  compilers: {
    solc: {
      version: "0.8.21",
    }
  }
};

