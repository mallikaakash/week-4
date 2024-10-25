import sinon from "sinon";
import chai from "chai";
import { ethers as hardhatEthers, waffle } from "hardhat";
import { Contract, Wallet } from "ethers";

// Use dynamic import for sinon-chai
(async () => {
  const sinonChai = await import("sinon-chai");
  chai.use(sinonChai.default);  // Use the 'default' export for ES modules
})();

afterEach(() => {
  sinon.restore();
});

export function deployTestContract(name: string): Promise<Contract> {
  return hardhatEthers
    .getContractFactory(name, getTestWallet())
    .then((contractFactory) => contractFactory.deploy());
}

export function getTestWallet(): Wallet {
  return waffle.provider.getWallets()[0];
}
