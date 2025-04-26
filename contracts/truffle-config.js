module.exports = {
  networks: {
    development: {
      host: "ganache",
      port: 9545,
      network_id: "5777",
    }
  },
  compilers: {
    solc: {
      version: "0.8.13"
    }
  }
};

