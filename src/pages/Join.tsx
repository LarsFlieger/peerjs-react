import Peer from "peerjs"
import { useEffect } from "react"
import { useParams } from "react-router-dom"

export const Join: React.FC = () => {
    const { id } = useParams()
    useEffect(() => {

        if (!id)
            return
        
        // Create peer instance to connect
        const peer = new Peer()

        peer.on('open', () => {

            // When ready build connection
            const conn = peer.connect(id)

            // When ready send hi. Host will recieve hi!
            conn.on('open', () => {
                conn.send('hi!')
            })
        })
    }, [])
    return <>
        <h2>Join</h2>
        <p>Will connect to {id}</p>
    </>
}