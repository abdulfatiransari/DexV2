const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Call contracts with the account:", deployer.address);

    console.log("Account balance:", (await deployer.getBalance()).toString());

    const UniswapV2Router02 = "0x16133CbFCe5de9Cd5864B9c13A5f35D8cFF25DDd"; // Address of Uniswap V2 Router

    const Token1 = "0xe55000454672Eef884A9E291D721AD749B49Fc5b"; // Address of token1
    const Token2 = "0x57963448439E52eBDfbF404E8896D0b3D3418859"; // Address of token2
    const amountToken1 = ethers.utils.parseEther("1"); // Amount of token1 to be added to the liquidity pool
    const amountToken2 = ethers.utils.parseEther("1"); // Amount of token2 to be added to the liquidity pool

    const signer = ethers.provider.getSigner();

    const UniswapRouter = await ethers.getContractAt("IRouter02", UniswapV2Router02, signer);

    // Approve Router to spend token1 and token2
    const token1 = await ethers.getContractAt("IERC20", Token1, signer);
    await token1.approve(UniswapV2Router02, amountToken1);

    const token2 = await ethers.getContractAt("IERC20", Token2, signer);
    await token2.approve(UniswapV2Router02, amountToken2);

    // Add liquidity to the pool
    const liquidity = await UniswapRouter.addLiquidity(
        Token1, // tokenA
        Token2, // tokenB
        amountToken1, // amountADesired
        amountToken2, // amountBDesired
        "0", // amountAMin
        "0", // amountBMin
        deployer.address, // to
        Math.floor(Date.now() / 1000) + 1000 // deadline
        // { gasLimit: 250000, gasPrice: ethers.utils.parseUnits("100", "gwei") }
    ).then((data) => console.log(data));

    console.log("Liquidity added successfully");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
