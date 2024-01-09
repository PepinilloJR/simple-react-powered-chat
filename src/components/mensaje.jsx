import { AplicationContext } from '../context'
import { useContext, useEffect, useState } from 'react'
import './chat.css'

export function Mensaje({mensaje, type}) {

    //funcion para transformar el Blob creado a partir 
    // de los bytes del archivo pasado en una imagen
    function Imagen({nombre, blob}) {
        const [imagenSource, setImagenSource] = useState("")
        
        useEffect(() => {
            
            //console.log(blob.type)
            const lectorArchivo = new FileReader() // un fileReader permite a la aplicacion leer de forma asincrona
                                                   // los contenidos de un archivo o buffer de datos, pudiendo leer objetos blob o archivos
                                                   // utilizando diferentes metodos
            lectorArchivo.readAsDataURL(blob) // LE DECIMES QUE LEA LOS DATOS Y LO CONVIERTA EN UNA URL (para usarlo en un src de una image en html)
            // como es asincrona, le decimos que cuando este cargado (onloadend)
            // setee la imagensource con el resultado
            
            
            lectorArchivo.onloadend = () => {
                setImagenSource(lectorArchivo.result)
                ManejarCambioDeImagen()
            }
        }, [blob]) 

        function ManejarCambioDeImagen() {
            if (blob.type.includes('image')) {
                return (
                    <img style={{width: '200px', height: '200px'}} src={imagenSource}></img>
                )
            } 
        }
        useEffect(() => {
            ManejarCambioDeImagen()
        }, [imagenSource])


        return (ManejarCambioDeImagen())
    }


    

    const MensajeContext = useContext(AplicationContext)


    if (mensaje.msg.archivo) {
        const blob = new Blob([mensaje.msg.archivo[0]], { type: mensaje.msg.archivo[1]})
        return (
            <>
                <div className={mensaje.msg.id === MensajeContext.usuario.id ? "mensajes-propios" : 'mensajes'}>
                    <p className='nombreMensaje' style={
                        {
                            color: `${mensaje.msg.color}`
                        }
                    }>{mensaje.msg.name}</p>
                    <p >{mensaje.msg.message}</p>
                    <div style={{width: '200px', height: '200px', backgroundColor: 'black'}}>
                        <Imagen nombre={"imagen"} blob={blob}></Imagen>
                    </div>
                    <span ></span>
                </div>
            
            </>)
    }else {
        return (
            <>
                <div className={mensaje.msg.id === MensajeContext.usuario.id ? "mensajes-propios" : 'mensajes'}>
                    <p className='nombreMensaje' style={
                        {
                            color: `${mensaje.msg.color}`
                        }
                    }>{mensaje.msg.name}</p>
                    <p>{mensaje.msg.message}</p>
                    <span ></span>
                </div>
            
            </>)
    }
}