import "bootstrap/dist/css/bootstrap.min.css"
import NFT from "./NFT";
import css from "../styles/NFT.module.css"
import { Button } from "react-bootstrap";
import { useState } from "react";
import { clusterApiUrl, Connection, LAMPORTS_PER_SOL, Transaction, SystemProgram, } from "@solana/web3.js"


// let provider;
// const NETWORK = clusterApiUrl("devnet");

window.Buffer = require("buffer").Buffer

const OWNER = "6ZtkKKvMuJ5AX6T2pVkfP9B1v4tC5dFm3yafWrEcsNqR"
const connection = new Connection(clusterApiUrl("devnet"))

function App() {

  const [activeAcc, setactiveAcc] = useState(null)
  let paths = []


  for (let i = 1; i < 5; i++) {
    paths.push(`https://nft-backend1.onrender.com/video/${i}`)
  }

  async function buy() {
    try {
      const provider = window.phantom.solana;
      const sendTx = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: activeAcc,
          toPubkey: OWNER,
          lamports: LAMPORTS_PER_SOL / 10
        })
      )
      const hash = await (await connection.getLatestBlockhash("finalized")).blockhash

      sendTx.recentBlockhash = hash
      sendTx.feePayer = activeAcc
      const res = await provider.signAndSendTransaction(sendTx)
      console.log(res);
      return true

    } catch (e) {
      console.log(e);
      return false
    }




  }

  async function connectWallet() {
    try {
      const provider = window.phantom.solana;
      const address = await provider.connect();
      setactiveAcc(address.publicKey)
    }
    catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="App">
      <div style={{ display: "flex", justifyContent: "space-between", }}>

        <h1 style={{ textAlign: "center", paddingTop: "1rem" }}>The NFT marketplace</h1>
        {
          activeAcc == null ?
            <Button style={{ margin: "1rem" }} onClick={connectWallet}>Connect Wallet</Button>
            :
            <div style={{ fontSize: "1rem", margin: "1rem", backgroundColor: "cyan", minHeight: "3rem", minWidth: "10rem", display: "flex", alignItems: "center", justifyContent: "center", color: "black" }}>
              <span>{activeAcc.toBase58().slice(0, 10) + "...."}</span>
            </div>
        }
      </div>
      <div className={css.wrapper}>
        {
          paths.map((img, i) => {
            return <NFT src={img} buy={buy} key={i} />
          })
        }
      </div>

    </div>
  );
}

export default App;
