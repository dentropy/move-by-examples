import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";
import * as dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Configure Aptos client
const aptosConfig = new AptosConfig({
  network: process.env.APTOS_NETWORK === "testnet" ? Network.TESTNET : Network.MAINNET,
});
const aptos = new Aptos(aptosConfig);

async function transferWithMemo(
  senderPrivateKey: string,
  recipientAddress: string,
  memo: string
) {
  try {
    // Load sender account from private key
    const sender = aptos.deriveAccountFromPrivateKey({
      privateKey: senderPrivateKey,
    });

    // Convert memo to UTF-8 bytes
    const memoBytes = new TextEncoder().encode(memo);

    // Create transaction payload
    const transaction = await aptos.transaction.build.simple({
      sender: sender.accountAddress,
      data: {
        function: "0x876::transfer_with_memo::transfer_with_memo",
        functionArguments: [recipientAddress, memoBytes],
      },
    });

    // Sign and submit transaction
    const committedTxn = await aptos.signAndSubmitTransaction({
      signer: sender,
      transaction,
    });

    // Wait for transaction confirmation
    const executedTxn = await aptos.waitForTransaction({
      transactionHash: committedTxn.hash,
    });

    console.log(`Transaction successful: ${executedTxn.hash}`);
    console.log(`Explorer URL: https://explorer.aptoslabs.com/txn/${executedTxn.hash}?network=${process.env.APTOS_NETWORK}`);
  } catch (error) {
    console.error("Error executing transaction:", error);
  }
}

// Example usage
async function main() {
  const privateKey = process.env.APTOS_PRIVATE_KEY;
  const recipient = "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef"; // Replace with actual recipient address
  const memo = "Thank you for the transfer!";

  if (!privateKey) {
    throw new Error("APTOS_PRIVATE_KEY not set in .env file");
  }

  await transferWithMemo(privateKey, recipient, memo);
}

// Run the script
main().catch((err) => console.error(err));