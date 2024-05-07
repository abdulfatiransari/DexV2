// Import necessary modules
const { ethers } = require("hardhat");

// Define the Uniswap V2 Router address and ABI

async function main() {
    // Get signer (you can replace this with any method to get a signer)
    const [deployer] = await ethers.getSigners();

    const UniswapV2Router02 = "0x16133CbFCe5de9Cd5864B9c13A5f35D8cFF25DDd";

    console.log("Call contracts with the account:", deployer.address);

    console.log("Account balance:", (await deployer.getBalance()).toString());

    const signer = ethers.provider.getSigner();
    const gasPrice = signer.getGasPrice();

    // Connect to the Uniswap Router contract
    // const uniswapRouter = new ethers.Contract(uniswapRouterAddress, uniswapRouterABI, signer);
    const UniswapRouter = await ethers.getContractAt("IRouter02", UniswapV2Router02, signer);

    // Example: Swap tokens
    const Token1 = "0xe55000454672Eef884A9E291D721AD749B49Fc5b";
    const Token2 = "0x57963448439E52eBDfbF404E8896D0b3D3418859";
    const amountIn = ethers.utils.parseEther("0.001", "18");
    const amountOutMin = 0; // Set minimum amount of tokenOut you want to receive
    const deadline = Math.floor(Date.now() / 1000) + 60 * 10; // 10 minutes from now

    const path = [Token1.toString(), Token2.toString()];
    const to = deployer.address;

    const token1 = await ethers.getContractAt("IERC20", Token1, signer);
    await token1.approve(UniswapV2Router02, amountIn);

    // Send transaction to swap tokens
    const tx = await UniswapRouter.swapExactTokensForTokens(amountIn, amountOutMin, path, to, deadline, {
        gasLimit: "210000",
        gasPrice: gasPrice,
    });

    console.log("Transaction Hash:", tx.hash);
    await tx.wait(); // Wait for transaction to be mined
    console.log("Tokens swapped successfully!");
}

// Execute the main function
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
