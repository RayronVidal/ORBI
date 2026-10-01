import { Outlet } from "react-router-dom";
import MenuLateral from "../components/MenuLateral/MenuLateral";

function Layout() {
    return (
        <div className="flex bg-slate-100 min-h-screen w-full">
            <MenuLateral />
            
            <main className="flex-1 p-6">
                <Outlet />
            </main>
        </div>
    );
}

export default Layout;
