import { BrowserRouter, Routes, Route } from "react-router-dom";
import AcesseSuaConta from "../pages/Auth/AcesseSuaConta/AcesseSuaConta";
import Inicio from "../pages/Library/Inicio/Inicio";
import Layout from "../layouts/Layout";
import Emprestimos from "../pages/Library/GestaoEmprestimos/Emprestimos";
import Catalogo from "../pages/Library/Catalogo/Catalogo";
import PerfilProfessor from "../pages/Library/PerfilProfessor/PerfilProfessor";
import ProtectedRoute from "./ProtectedRoute";

export function Rotas() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<AcesseSuaConta />} />

                <Route element={<ProtectedRoute />}>
                    <Route element={<Layout />}>
                        <Route path="/dashboard" element={<Inicio />} />
                        <Route path="/emprestimos" element={<Emprestimos />} />
                        <Route path="/catalogo" element={<Catalogo />} />
                        <Route path="/perfil" element={<PerfilProfessor />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default Rotas;
