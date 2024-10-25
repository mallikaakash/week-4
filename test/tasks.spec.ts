import { deployTestContract, getTestWallet } from "./test-helpers";
import { waffle, run } from "hardhat";
import { expect } from "chai";
import sinon from "sinon";
import * as provider from "../lib/provider";

describe("tasks", () => {
    beforeEach(async () => {
        sinon.stub(provider, "getProvider").returns(waffle.provider);
        const wallet = getTestWallet();
        sinon.stub(process, "env").value({
            ETH_PUBLIC_KEY: wallet.address,
            ETH_PRIVATE_KEY: wallet.privateKey,
        });
    });

    describe("deploy-contract", () => {
        it("calls through and returns the transaction object", async () => {
            const writeStub = sinon.stub(process.stdout, "write");

            await run("deploy-contract");

            // Check if writeStub was called with expected output
            expect(writeStub.calledWith(sinon.match.string)).to.be.true;

            writeStub.restore();
        });
    });

    describe("mint-nft", () => {
        beforeEach(async () => {
            const deployedContract = await deployTestContract("MyNFT");
            process.env.NFT_CONTRACT_ADDRESS = deployedContract.address;
        });

        it("calls through and returns the transaction object", async () => {
            const writeStub = sinon.stub(process.stdout, "write");

            await run("mint-nft", { tokenuri: "https://example.com/record/4", contract: process.env.NFT_CONTRACT_ADDRESS });

            // Check if writeStub was called with expected output
            expect(writeStub.calledWith(sinon.match.string)).to.be.true;

            writeStub.restore();
        });
    });
});
