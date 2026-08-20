import { useState } from "react";
import "./Sidebar.css";
import SidebarOpenIcon from "../assets/sidebaropen.svg?react";
import SidebarCloseIcon from "../assets/sidebarclose.svg?react";

const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div className="sidebar">
            <button className="collapse-button" onClick={() => setIsCollapsed(!isCollapsed)}>{isCollapsed ? <SidebarCloseIcon className="sidebar-icon" /> : <SidebarOpenIcon className="sidebar-icon" />}</button>
            <button className="sidebar-button">Dashboard</button>
            <button className="sidebar-button">Projects</button>
            <button className="sidebar-button">Calendar</button>
            <button className="sidebar-button">Teams</button>
            <button className="sidebar-button">Reports</button>
        </div>
    );
};

export default Sidebar;