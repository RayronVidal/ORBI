import { BrowserRouter, Routes, Route } from "react-router-dom";
import AcesseSuaConta from "../pages/Auth/AcesseSuaConta/AcesseSuaConta";
import Inicio from "../pages/Library/Inicio/Inicio";
import Layout from "../layouts/Layout";
import Emprestimos from "../pages/Library/GestaoEmprestimos/Emprestimos";

export function Rotas(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<AcesseSuaConta />} />

                <Route element={<Layout />}>
                    <Route path="/dashboard" element={<Inicio />} />
                    <Route path="/emprestimos" element={<Emprestimos />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
export default Rotas;
