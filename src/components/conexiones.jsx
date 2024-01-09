import { useContext, useEffect } from "react"
import { AplicationContext } from "../context"

export function Connexiones() {
    const connectionContext = useContext(AplicationContext)
    
    useEffect(() => {
        if (connectionContext.socket) {
            connectionContext.socket.on(`nuser ${connectionContext.clave + connectionContext.usuario.name}`, (usuario) => {
                connectionContext.setUsuario(usuario)
                //existe socket off 
                // para eliminar manejadores de eventos en algun momento
              })
        }
    }, [connectionContext.socket])
}