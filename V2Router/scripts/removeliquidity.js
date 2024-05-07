const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Call contracts with the account:", deployer.address);

    const UniswapV2Router02 = "0x16133CbFCe5de9Cd5864B9c13A5f35D8cFF25DDd"; // Address of Uniswap V2 Router

    const Token1 = "0xe55000454672Eef884A9E291D721AD749B49Fc5b"; // Address of token1
    const Token2 = "0x57963448439E52eBDfbF404E8896D0b3D3418859"; // Address of token2

    const liquidityToken = "0xa08f5bc86b5d1e14e87655af9cccb35906de16b4"; // Address of liquidity token pair address
    const liquidityAmount = ethers.utils.parseEther("0.5"); // Amount of liquidity tokens to be removed
    const minToken1Amount = ethers.utils.parseEther("0.1"); // Minimum amount of token1 expected to be received
    const minToken2Amount = ethers.utils.parseEther("0.1"); // Minimum amount of token2 expected to be received

    const signer = ethers.provider.getSigner();

    const UniswapRouter = await ethers.getContractAt("IRouter02", UniswapV2Router02, signer);

    // Approve Router to spend liquidity tokens
    const liquidityTokenContract = await ethers.getContractAt("IERC20", liquidityToken, signer);
    await liquidityTokenContract.approve(UniswapV2Router02, liquidityAmount);

    // Remove liquidity from the pool
    await UniswapRouter.removeLiquidity(
        Token1, // tokenA
        Token2, // tokenB
        liquidityAmount, // liquidity
        minToken1Amount, // amountAMin
        minToken2Amount, // amountBMin
        deployer.address, // to
        Math.floor(Date.now() / 1000) + 1000 // deadline
    ).then((data) => console.log(data));

    console.log("Liquidity removed successfully");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
