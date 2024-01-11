import logo from './logo.svg';
import { AplicationContext } from './context';
import './App.css';
import io from 'socket.io-client';
import { useEffect, useState, useRef } from 'react'
import { Chat } from './components/chat';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { Rutas } from './components/rutas';
import { Connexiones } from './components/conexiones';
// al ser un cliente temporal vamos a hacer todo en app, por que solo es un chat

function App() {

  const [socket, setSocket] = useState(null)
  const [clave, setClave] = useState('')
  const [mensajes, setMensajes] = useState([])


  const [usuario, setUsuario] = useState({})


  function CrearSocket() {
    //setSocket(io('https://chat-back-dev-pksc.4.us-1.fl0.io'))
    //setSocket(io('https://24.232.114.64/'))
    setSocket(io('http://pepinillochat.ddns.net/'))
    //(io('https://chat-back-dev-pksc.4.us-1.fl0.io'))
  }

  useEffect(() => {
    if (socket) {
      const c1 = (Math.random() * (9999 - 1000) + 1000).toString()
      const c2 = (Math.random() * (99999 - 10000) + 10000).toString()
      const c3 = (Math.random() * (9999 - 1000) + 1000).toString()

      setClave(c1 + c2 + c3)
      socket.emit('nuevo usuario', [usuario, clave])
    }
  }, [socket])


  return (
    <AplicationContext.Provider value={{
      mensajes, setMensajes, socket, usuario, setUsuario, CrearSocket, clave
    }}>
      <Connexiones></Connexiones>
      <HashRouter>
        <Rutas></Rutas>
      </HashRouter>
    </AplicationContext.Provider>
  )
}
// <Chat></Chat>
export default App;



/*<div className="App">
      <div className='chatBox'>

        <div ref={cajaMensajes} className='CajaMensajes'>
          {mensajes.map((men, key) => {
            return (
              <div key={key} ref={lastMensaje} className='mensg'>
                <p key={`${key} ${nombre}`} style={{
                  color: men.color 
                }}>{men.name}</p>
                <p key={key}>{men.message}</p>
              </div>
            )
          })}
        </div>

        <form className='sendBox' onSubmit={(event) => {
          event.preventDefault()
          if (mensaje.current.value !== '' && socket) {

            // el emit envia un evento y un valor al socket del servidor
            // el primer valor es el tipo de evento, que tomara el socket 
            // en el servidor para filtrar que deciciones tomar con esta
            socket.emit('chat message', {name: nombre, message: mensaje.current.value, color: color})
            mensaje.current.value = ''
          }
        }}>
          <input className='searchBox' ref={mensaje} type='text' placeholder='escribir mensaje...'>            
          </input>
          <button className='botonSend'>Enviar</button>
        </form>
      </div>
    </div>*/