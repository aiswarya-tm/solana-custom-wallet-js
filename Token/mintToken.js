const {
    generateSigner,
    createSignerFromKeypair,
    signerIdentity
  } = require("@metaplex-foundation/umi");
  const { mintV1, TokenStandard } = require("@metaplex-foundation/mpl-token-metadata");
  const {createUmi} = require("@metaplex-foundation/umi-bundle-defaults");
  require("dotenv").config();
  const secret = require("../dummy.json")
  const {mplCandyMachine} = require("@metaplex-foundation/mpl-candy-machine");
  
  const umi = createUmi(process.env.QUICKNODE_RPC);
  const userWallet = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(secret));
  const userWalletSigner = createSignerFromKeypair(umi, userWallet);
  
  async function main() {
  
  
    umi.use(signerIdentity(userWalletSigner));
    umi.use(mplCandyMachine())
  
    await mintV1(umi, {
      mint: process.env.TOKEN_ADDRESS,
      authority: umi.identity,
      amount: 1000000_00000000,
      tokenOwner: userWallet.publicKey,
      tokenStandard: TokenStandard.Fungible,
    }).sendAndConfirm(umi)
  }
  main();
  