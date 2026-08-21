import './Sidebar.css';
import DashBoardIcon from '../assets/dashboard.svg?react';
import TaskIcon from '../assets/task.svg?react';
import TeamIcon from '../assets/team.svg?react';
import CalendarIcon from '../assets/calendar.svg?react';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    }

    return (
       <div className="sidebar">
            <button onClick={() => handleNavigation('/dashboard')}>
                <DashBoardIcon className="sidebar-icon"/>
                <span className="sidebar-text">Dashboard</span>
            </button>
            <button onClick={() => handleNavigation('/tasks')}>
                <TaskIcon className="sidebar-icon"/>
                <span className="sidebar-text">Tasks</span>
            </button>
            <button onClick={() => handleNavigation('/teams')}>
                <TeamIcon className="sidebar-icon"/>
                <span className="sidebar-text">Teams</span>
            </button>
            <button onClick={() => handleNavigation('/calendar')}>
                <CalendarIcon className="sidebar-icon"/>
                <span className="sidebar-text">Calendar</span>
            </button>
       </div>
    );
}

export default Sidebar;