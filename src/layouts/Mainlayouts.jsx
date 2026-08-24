import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import './Mainlayouts.css';

export default function MainLayouts() {
    return (
        <div className="main-layout">
            <Sidebar/> 
            <div className="main-area">
                <Navbar />
                <div className="main">
                    <Outlet />
                </div>
            </div>
        </div>
        
    );
}