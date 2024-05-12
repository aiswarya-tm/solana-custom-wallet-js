const SOLANA = require('@solana/web3.js');
const { Connection, PublicKey, LAMPORTS_PER_SOL, clusterApiUrl, Keypair } = SOLANA;
const SOLANA_CONNECTION = new Connection(clusterApiUrl('devnet'));
const AIRDROP_AMOUNT = 5 * LAMPORTS_PER_SOL; // 5 SOL 
const key = require("./dummy.json");

(async () => {

    let firstWinPrivKey = key.slice(0,32);
    let firstWinWallet = Keypair.fromSeed(Uint8Array.from(firstWinPrivKey));
    const WALLET_ADDRESS = firstWinWallet.publicKey.toString(); // Your wallet address
    console.log(firstWinWallet.publicKey.toString());
    console.log(`Requesting airdrop for ${WALLET_ADDRESS}`)
    const signature = await SOLANA_CONNECTION.requestAirdrop(
        new PublicKey(WALLET_ADDRESS),
        AIRDROP_AMOUNT
    );
    const { blockhash, lastValidBlockHeight } = await SOLANA_CONNECTION.getLatestBlockhash();
    await SOLANA_CONNECTION.confirmTransaction({
        blockhash,
        lastValidBlockHeight,
        signature
    },'finalized');
    console.log(`Tx Complete: https://explorer.solana.com/tx/${signature}?cluster=devnet`)

})();