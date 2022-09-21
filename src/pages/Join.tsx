import Peer, { DataConnection } from "peerjs"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
let conn: DataConnection
export const Join: React.FC = () => {
    const { id } = useParams()
    useEffect(() => {

        if (!id)
            return
        
        // Create peer instance to connect
        const peer = new Peer()

        peer.on('open', () => {

            // When ready build connection
            conn = peer.connect(id)

            // When ready send hi. Host will recieve hi!
            conn.on('open', () => {
                // conn.send('hi!')
            })
        })
    }, [])

    const sendTestMessage = () => {
        conn.send('Hey!')
    }
    return <>
        <h2>Join</h2>
        <p>Will connect to {id}</p>

        <button onClick={() => sendTestMessage()}>Send Message</button>
    </>
}