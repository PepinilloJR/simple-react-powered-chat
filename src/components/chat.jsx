import { useContext, useEffect, useRef, useState } from "react"
import { AplicationContext } from "../context"
import { useNavigate } from "react-router-dom";
import io from 'socket.io-client';
import { Connexiones } from "./conexiones";
import { MdOutlinePersonOutline } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";

import { Mensaje } from "./mensaje";

import './chat.css'
import { eventWrapper } from "@testing-library/user-event/dist/utils";

export function Chat() {
    const ContextoChat = useContext(AplicationContext)
    const irA = useNavigate() // permite navegar atraves de routes, toma la url
    const Texto = useRef(null)

    const CajaTexto = useRef(null)

    const [archivo, setArchivo] = useState(null)
    const [preview, setPreview] = useState('')
    const [previewDis, setPreviewDis] = useState('none')

    const [usersLen, setUserslen] = useState('')

    function EnviarMensaje(mensaje) {
        console.log()
        if (mensaje.trim().length > 0) {
            //console.log(ContextoChat.usuario)
            //console.log(archivo)
            ContextoChat.socket.emit('chat message', {name: ContextoChat.usuario.name, id: ContextoChat.usuario.id, message: `${mensaje}`, color: ContextoChat.usuario.color, archivo: archivo})
            setArchivo(null)
            setPreview('')
            setPreviewDis('none')
            CajaTexto.current.scrollTop = CajaTexto.current.scrollHeight
        }
    }

    useEffect(() => {
        if (archivo) {
            const lectorArchivo = new FileReader()
            lectorArchivo.readAsDataURL(archivo[0])
            lectorArchivo.onloadend = () => {
                setPreview(lectorArchivo.result)
            }
        }
    }, [archivo])


    function seleccionarArchivo(evento) {
        setArchivo([evento.target.files[0], evento.target.files[0].type])
        setPreviewDis('flex')

    }



    useEffect(() => {
        if (ContextoChat.socket) {
            //console.log("todo correcto")
            ContextoChat.socket.emit('getMessages')
            ContextoChat.socket.emit('get-users-lenght')
        } else {
            irA("/")
        }
    },[])

    useEffect(() => {
        if (ContextoChat.socket) {

            const ManejarMensaje = (msg) => {
                ContextoChat.setMensajes(msg)
            }

            ContextoChat.socket.on('chat message', ManejarMensaje)
        }
    }, [ContextoChat.socket])

    useEffect(() => {
        if (ContextoChat.socket) {

            const ManejarLongitudClientes = (longitud) => {
                //console.log(longitud)
                setUserslen(longitud)
            }

            ContextoChat.socket.on('userslen', ManejarLongitudClientes)
        }
    }, [ContextoChat.socket])


    useEffect(() => {
        if (CajaTexto.current && (CajaTexto.current.scrollHeight - CajaTexto.current.scrollTop) < 1000) {
            console.log(CajaTexto.current.scrollHeight)
            CajaTexto.current.scrollTop = CajaTexto.current.scrollHeight
        }

    }, [ContextoChat.mensajes])


    if (ContextoChat.usuario.id) {
        return (
            <div className="CuerpoChat">
                <div className="people"><MdOutlinePersonOutline/> {usersLen}</div>
                
                <div className="cajaChat">
                <div ref={CajaTexto} className="CajaMensajes">
                    {ContextoChat.mensajes.map((msg, key) => {
                        return (<Mensaje key={key} mensaje={{msg}}></Mensaje>)
                    })
                    }
                </div>
                <form onSubmit={(event) => {
                    event.preventDefault()
                    EnviarMensaje(Texto.current.value)
                    Texto.current.value = ''
                }}>
                    <div className="cajaTextoArchivo">
                        <div className="cajaTextoPreview">
                        <textarea ref={Texto} placeholder="Escribe un mensaje!" className="textoChat" onChange={() => {
                            Texto.current.style.height = `auto`
                            let Altura = Texto.current.scrollHeight
                            Texto.current.style.height = `${Altura}px`
                        }} onKeyDown={(event) => {


                        if (event.key === 'Enter' && !event.shiftKey) {
                            event.preventDefault()
                            EnviarMensaje(Texto.current.value)
                            Texto.current.value = ''
                            Texto.current.style.height = `auto`
                        }
                        
                        }}>
                        </textarea>
                        <label htmlFor="files" className="botonSubirArchivo"><IoMdAdd/></label>
                        <input id="files" onChange={seleccionarArchivo} className="inputFile" type="file" accept="image/png, image/gif, image/jpeg"></input>
                        </div>
                        <img className="preview" src={preview} style={{display: `${previewDis}`}} alt=""></img>
                    </div>
                </form>
                </div>
            </div>
        )
        }
}

//<button>ENVIAR</button>
//<div>{ContextoChat.usuario.socketID}</div>