import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function MainLayouts() {
    return (
        <div>
            <Navbar />
            <Sidebar />
            <Outlet />
        </div>
    );
}