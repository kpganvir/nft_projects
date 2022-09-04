
require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
const { API_URL, PRIVATE_KEY } = process.env ;
module.exports = {
   solidity: "0.8.9",
   defaultNetwork: 'goerli',
   networks:{
      hardhat:{},
      goerli:{

        url:API_URL,
        accounts:[`0x${PRIVATE_KEY}`],
      },
      
    },
  
};
