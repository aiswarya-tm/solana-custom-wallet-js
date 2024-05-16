const {
  percentAmount,
  generateSigner,
  some,
  createSignerFromKeypair,
  signerIdentity
} = require("@metaplex-foundation/umi");
const { createFungible } = require("@metaplex-foundation/mpl-token-metadata");
const {createUmi} = require("@metaplex-foundation/umi-bundle-defaults");
require("dotenv").config();
const secret = require("../dummy.json")


const umi = createUmi(process.env.QUICKNODE_RPC);
const userWallet = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(secret));
const userWalletSigner = createSignerFromKeypair(umi, userWallet);

async function main() {

  const mint = generateSigner(umi);

  umi.use(signerIdentity(userWalletSigner));

  await createFungible(umi, {
    mint,
    name: "Tanjiro Demon Slayer",
    symbol: "Tanjiro",
    uri: "https://github.com/aiswarya-tm/solana-custom-wallet-js/blob/feature/spl-tokens/metadata/data/tanjiro.json",
    sellerFeeBasisPoints: percentAmount(5.5),
    decimals: some(8), // for 0 decimals use some(0)
  }).sendAndConfirm(umi).then(() => {
    console.log("Successfully created Fungible Token", mint.publicKey, ")");
  })

}
main();
