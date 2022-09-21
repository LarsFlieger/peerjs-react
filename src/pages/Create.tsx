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
            setData(value => [...value, `Host is ready "${peer.id}"`])
        })

        // Wait till you get a connection. Data will be the sent data.
        peer.on('connection', (conn) => {
            setConnection(value => [...value, conn.connectionId])
            setData(value => [...value, `Connection open "${conn.connectionId}"`])

            conn.on('data', (data) => {

                // Print sent data
                console.log(data)
                setData(value => [...value, `Data from "${conn.connectionId}": ${data}`])
            })

            conn.on('close', () => {
                setConnection(value => value.filter(id => conn.connectionId !== id))
                setData(value => [...value, `Connection closed "${conn.connectionId}"`])
            })
        })

    }, [])
    return <>
        <h2>Create Lobby</h2>

        {yourConnectionId && <a target="_blank" href={`/join/${yourConnectionId}`}>/join/{yourConnectionId}</a>}

        <h3>Connected</h3>
        <ul>
            {connection.map((item, index) => <li key={index}>{item}</li>)}
        </ul>

        <h3>Log:</h3>
        <ul>
            {data.map((item, index) => <li key={index}>{item}</li>)}
        </ul>
    </>
}