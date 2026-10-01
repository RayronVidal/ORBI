import { Outlet } from "react-router-dom";
import MenuLateral from "../components/MenuLateral/MenuLateral";

function Layout() {
    return (
        <div className="flex min-h-screen w-full bg-slate-100">
            <MenuLateral />

            <main className="min-w-0 flex-1 p-4 pt-20 md:p-6 md:pt-6">
                <Outlet />
            </main>
        </div>
    );
}

export default Layout;
