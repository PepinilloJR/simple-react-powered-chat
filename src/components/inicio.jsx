import { useContext, useEffect, useRef, useState } from "react"
import { AplicationContext } from "../context"
import { NavLink } from "react-router-dom"

import './inicio.css'

export function Inicio() {
    const ContextoInicio = useContext(AplicationContext)

    const Nombre = useRef('')
    const Color = useRef('')

    const [colorNombre , setColorNombre] = useState('#000000')


    return (
        <div className="inicioCuerpo">
            <form className="cajaInicio">
                <p className="textoInicio">Ingresa un apodo</p>
                <input ref={Nombre} style={{
                    color: colorNombre
                }
                } className="nombreInicio" type="text" />
                <p className="textoInicio">Selecciona un color para que te vean</p>
                <input className="colorSelector" onChange={() => {
                    setColorNombre(Color.current.value)
                }} ref={Color} type="color"></input>
                <NavLink to={"/chat"}>
                    <button className="botonInicio" onClick={() => {
                        ContextoInicio.setUsuario({
                            name: Nombre.current.value,
                            color: colorNombre
                        })
                        ContextoInicio.CrearSocket()
                    }}>IR A CHATEAR</button>
                </NavLink>
            </form>

        </div>

    )
}