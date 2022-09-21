import Peer from "peerjs"
import { useEffect, useState } from "react"

export const Create: React.FC = () => {

    const [data, setData] = useState<any[]>([])
    const [connection, setConnection] = useState<any[]>([])
    const [yourConnectionId, setYourConnectionId] = useState<null | string>(null)
    useEffect(() => {
        // Create peer instance for host
        const peer = new Peer()

        // Log id
        peer.on('open', () => {
            console.log('ID: ' + peer.id)
            setYourConnectionId(peer.id)
        })

        // Wait till you get a connection. Data will be the sent data.
        peer.on('connection', (conn) => {
            setConnection(value => [...value, conn.connectionId])
            conn.on('data', (data) => {

                // Print sent data
                console.log(data)
                setData(value => [...value, data])
            })

            conn.on('close', () => {
                setConnection(value => value.filter(id => conn.connectionId !== id))
            })
        })

    }, [])
    return <>
        <h2>Create Lobby</h2>

        {yourConnectionId && <a target="_blank" href={`/join/${yourConnectionId}`}>/join/{yourConnectionId}</a>}

        <h3>Connected</h3>
        {connection.map((item, index) => <p key={index}>{item}</p>)}

        <h3>Recieved data:</h3>
        {data.map((item, index) => <p key={index}>{item}</p>)}
    </>
}