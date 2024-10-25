import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import * as dotenv from "dotenv";
import "./tasks/nft";  // Make sure tasks are correctly imported

// Load environment variables
dotenv.config();

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.27", // Your main contract version
      },
      {
        version: "0.8.1", // OpenZeppelin dependencies
      },
    ],
  },
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
      accounts: process.env.ETH_PRIVATE_KEY ? [process.env.ETH_PRIVATE_KEY] : [],
    },
  },
};

export default config;
