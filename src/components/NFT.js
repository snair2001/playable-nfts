import React, { useRef, useState } from 'react'
import css from "../styles/NFT.module.css"
import { Button, Modal } from 'react-bootstrap'

function NFT({ src, buy }) {

    const [isBought, setisBought] = useState(false)
    const [txSuccess, settxSuccess] = useState()
    const videoRef = useRef(null);

    async function handleBuy() {
        let result = await buy();
        if (result) {
            videoRef.current.play();
            setisBought(true)
            settxSuccess(true)
        }
        else {
            videoRef.current.pause()
            settxSuccess(false)
        }
    }


    return (
        <div className={isBought ? css.sold : css.NFT}>

            <Modal show={txSuccess === false} onHide={() => { settxSuccess("") }}>
                <Modal.Dialog>
                    <Modal.Header closeButton>
                        <Modal.Title>Something went wrong</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Failed to process the transaction!
                        <br />
                        Try refreshing the page and connecting your wallet again!
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => { settxSuccess("") }} variant="secondary">Close</Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </Modal>

            <header style={{ textAlign: "center" }}> {`NFT #${Math.floor(Math.random() * 10000)}`}</header>
            <video controls={isBought} ref={videoRef} style={{ height: "13rem" }} className={css.NFT} >
                <source src={src} />
            </ video >
            {
                isBought ?
                    <div style={{ fontSize: "1.5rem", textAlign: "center", backgroundColor: "green" }}>Success!</div> :
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <span style={{ marginLeft : "0.5rem", fontSize: "1.3rem", textAlign: "left" }}>
                            Price : 0.1 SOL
                        </span>
                        <Button onClick={handleBuy}>Play</Button>
                    </div>
            }
        </div>
    )
}

export default NFT