import { BrowserRouter, Routes, Route } from "react-router-dom";
import AcesseSuaConta from "../pages/Auth/AcesseSuaConta/AcesseSuaConta";
import Inicio from "../pages/Library/Inicio/Inicio";
import MenuLateral from "../components/MenuLateral/MenuLateral";

export function Rotas(){
    return (
    <BrowserRouter>
            <MenuLateral />
            <main className="ml-[280px] min-h-screen">
                <Routes>
                    <Route path="/" element={<AcesseSuaConta />} />
                    <Route path="/inicio" element={<Inicio />} />
                    <Route path="/menu" element={<MenuLateral />} />
                </Routes>
            </main>
    </BrowserRouter>


    )
}
export default Rotas;

