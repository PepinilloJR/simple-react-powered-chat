import { Route, Routes } from "react-router-dom";
import { Chat } from "./chat";
import { Inicio } from "./inicio";


export function Rutas() {

    return (
        <Routes>
            
            <Route path="/" element={<Inicio></Inicio>}></Route>
            <Route path="/chat" element={<Chat></Chat>}></Route>
        </Routes>
    )
}