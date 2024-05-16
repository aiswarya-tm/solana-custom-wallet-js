const {percentAmount, generateSigner, signerIdentity, createSignerFromKeypair} = require("@metaplex-foundation/umi");
const {TokenStandard, createAndMint} = require("@metaplex-foundation/mpl-token-metadata");
const {createUmi} = require("@metaplex-foundation/umi-bundle-defaults");
const {mplCandyMachine} = require("@metaplex-foundation/mpl-candy-machine");
require("@solana/web3.js");
const secret = require("./dummy.json")
require("dotenv").config();

const umi = createUmi(process.env.QUICKNODE_RPC); //Replace with your QuickNode RPC Endpoint

const userWallet = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(secret));
const userWalletSigner = createSignerFromKeypair(umi, userWallet);

const metadata = {
    name: "Zenitsu Demon Slayer Token",
    symbol: "Zenitsu",
    uri: "https://github.com/aiswarya-tm/solana-custom-wallet-js/blob/feature/spl-tokens/token.json",
};

const mint = generateSigner(umi);
umi.use(signerIdentity(userWalletSigner));
umi.use(mplCandyMachine())


createAndMint(umi, {
    mint,
    authority: umi.identity,
    name: metadata.name,
    symbol: metadata.symbol,
    uri: metadata.uri,
    sellerFeeBasisPoints: percentAmount(0),
    decimals: 8,
    amount: 1000000_00000000,
    tokenOwner: userWallet.publicKey,
    tokenStandard: TokenStandard.Fungible,
    }).sendAndConfirm(umi).then(() => {
    console.log("Successfully minted 1 million tokens (", mint.publicKey, ")");
});


