async function main() {
    const Contract = await ethers.getContractFactory("MyNFT"); // Ensure this matches your contract's name
    const contract = await Contract.deploy(/* constructor arguments if any */);
    await contract.deployed();

    console.log("Contract deployed to:", contract.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
