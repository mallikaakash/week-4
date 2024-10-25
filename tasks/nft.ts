import { task, types } from "hardhat/config";
import { Contract } from "ethers";
import { TransactionResponse } from "@ethersproject/abstract-provider";
import * as dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Task to deploy the NFT contract
task("deploy-contract", "Deploy NFT contract").setAction(async (_, hre) => {
  try {
    // Deploy contract using the default signer (from Hardhat config or wallet private key)
    const contractFactory = await hre.ethers.getContractFactory("MyNFT");
    const contract = await contractFactory.deploy(); // Deploy the contract
    const txReceipt = await contract.deployed(); // Wait for deployment to complete

    // Log transaction receipt and contract address
    console.log(`Contract deployed! TX hash: ${txReceipt.deployTransaction.hash}`);
    console.log(`Contract deployed to: ${contract.address}`);

    // Return the transaction object to pass the test
    return txReceipt.deployTransaction;
  } catch (error) {
    console.error("Error deploying contract:", error);
    throw new Error("Failed to deploy contract");
  }
});

// Task to mint an NFT
task("mint-nft", "Mint an NFT")
  .addParam("tokenuri", "Your ERC721 Token URI", undefined, types.string)
  .addParam("contract", "Deployed NFT contract address", "0xAecC8B41493a95A8a77Bc7236d8420728Ee726c7", types.string) // Added contract address param
  .setAction(async (taskArgs, hre) => {
    try {
      const { tokenuri, contract: contractAddress } = taskArgs; // Extract tokenUri and contract address

      // Attach to the deployed contract
      const MyNFT = await hre.ethers.getContractFactory("MyNFT");
      const contract: Contract = MyNFT.attach(contractAddress); // Attach to the existing deployed contract

      // Mint the NFT
      const tx: TransactionResponse = await contract.mintNFT(process.env.ETH_PUBLIC_KEY!, tokenuri, {
        gasLimit: 500_000, // Setting gas limit
      });

      // Wait for the transaction to be mined
      await tx.wait();

      console.log(`NFT minted! TX hash: ${tx.hash}`);

      // Return the transaction object to pass the test
      return tx;
    } catch (error) {
      console.error("Error minting NFT:", error);
      throw new Error("Failed to mint NFT");
    }
  });
