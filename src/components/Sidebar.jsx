import { useState } from 'react';
import './Sidebar.css';
import { useNavigate } from 'react-router-dom';

import DashboardIcon from '../assets/dashboard.svg?react';
import TasksIcon from '../assets/tasks.svg?react';
import TeamsIcon from '../assets/teams.svg?react';
import CalendarIcon from '../assets/calendar.svg?react';
import TrashIcon from '../assets/trash.svg?react';
import ExpandIcon from '../assets/sidebar-expand.svg?react';
import CollapseIcon from '../assets/sidebar-close.svg?react';
import ChevronDownIcon from '../assets/chevron-down.svg?react';

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState({});
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
    if (isExpanded) {
      setExpandedMenus({});
    }
  };

  const toggleMenu = (menuId, e) => {
    e.stopPropagation(); 
    if (isExpanded) {
      setExpandedMenus(prev => ({
        ...prev,
        [menuId]: !prev[menuId]
      }));
    }
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: DashboardIcon, hoverColor: 'var(--color-primary)', path: '/dashboard' },
    { 
      id: 'tasks', 
      label: 'Tasks', 
      icon: TasksIcon, 
      hoverColor: 'var(--color-blue)',
      path: '/tasks',
      subItems: [
        { label: 'Assigned to me', path: '/tasks/assigned-to-me' }, 
        { label: 'Today & Upcoming', path: '/tasks/today-upcoming' }
      ]
    },
    { 
      id: 'teams', 
      label: 'Teams', 
      icon: TeamsIcon, 
      hoverColor: 'var(--color-green)',
      path: '/teams',
      subItems: [
        { label: 'All Teams', path: '/teams/all-teams' }, 
        { label: 'All Peoples', path: '/teams/all-peoples' }
      ]
    },
    { id: 'calendar', label: 'Calendar', icon: CalendarIcon, hoverColor: 'var(--color-orange)', path: '/calendar' },
    { id: 'trash', label: 'Trash', icon: TrashIcon, hoverColor: 'var(--color-red)', path: '/trash' },
  ];

  return (
    <div className={`sidebar ${isExpanded ? 'expanded' : 'collapsed'}`}>
      <div className="sidebar-header">
        <button className="toggle-btn" onClick={toggleSidebar}>
          {isExpanded ? <CollapseIcon /> : <ExpandIcon />}
        </button>
      </div>

      <div className="sidebar-content">
        {menuItems.map(item => {
          const Icon = item.icon;
          const isMenuOpen = expandedMenus[item.id];
          const hasSubItems = item.subItems && item.subItems.length > 0;

          return (
            <div key={item.id} className="menu-group">
              
              {/* CONTAINER: Bọc cả 2 phần để xử lý bắt sự kiện hover chung */}
              <div 
                className="menu-item-container"
                style={{ '--hover-accent': item.hoverColor }}
              >
                {/* 1. PHẦN CHÍNH: Click để chuyển trang (Navigate) */}
                <div 
                  className="menu-item-main"
                  onClick={() => handleNavigate(item.path)}
                >
                  <div className="menu-item-icon">
                    <Icon />
                  </div>
                  {isExpanded && (
                    <span className="menu-item-label">{item.label}</span>
                  )}
                  {!isExpanded && <span className="menu-item-label-collapsed">{item.label}</span>}
                </div>

                {/* 2. PHẦN NÚT MỞ RỘNG: Chỉ hiện khi sidebar mở rộng & có sub-item */}
                {isExpanded && hasSubItems && (
                  <button 
                    className={`menu-item-chevron-btn ${isMenuOpen ? 'open' : ''}`}
                    onClick={(e) => toggleMenu(item.id, e)}
                  >
                    <ChevronDownIcon />
                  </button>
                )}
              </div>

              {/* Submenu Accordion: Click vào để chuyển đến trang con */}
              {isExpanded && hasSubItems && (
                <div 
                  className="submenu" 
                  style={{ height: isMenuOpen ? `${item.subItems.length * 36}px` : '0px' }}
                >
                  {item.subItems.map((sub, idx) => (
                    <div 
                      key={idx} 
                      className="submenu-item"
                      onClick={() => handleNavigate(sub.path)}
                    >
                      {sub.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;