import React, { useState, useRef, useEffect } from 'react';
import './sidebar.css';

// ─── Import SVG icons từ folder assets ───────────────────────────────────────
import SidebarExpandIcon from '../assets/sidebar-expand.svg?react';
import SidebarCloseIcon  from '../assets/sidebar-close.svg?react';
import DashboardIcon      from '../assets/dashboard.svg?react';
import TasksIcon          from '../assets/task.svg?react';
import TeamsIcon          from '../assets/team.svg?react';

// ─── Icon Tam giác đặc (Triangle) dùng khi hover ──────────────────────────────
const TriangleIcon = ({ isOpen }) => (
  <svg 
    className={`triangle-icon ${isOpen ? 'open' : ''}`} 
    viewBox="0 0 24 24" 
    fill="currentColor"
  >
    <path d="M9 5v14l10-7z" />
  </svg>
);

// ─── Danh sách item trong popup Create ────────────────────────────────────────
const CREATE_ITEMS = [
  {
    group: 'quick',
    items: [
      { id: 'task',    icon: '✓', label: 'Task',    shortcut: 'Alt T' },
      { id: 'message', icon: '➤', label: 'Message', shortcut: 'Ctrl G' },
    ],
  },
  {
    group: 'advanced',
    items: [
      { id: 'list',    icon: '≡', label: 'List',    desc: 'Track tasks, projects, people & more' },
      { id: 'channel', icon: '#', label: 'Channel', desc: 'Conversations on specific topics' },
      { id: 'space',   icon: '◎', label: 'Space',   desc: 'Organize work by team or department' },
    ],
  },
  {
    group: 'ai',
    items: [
      { id: 'ai',    icon: '✦', label: 'Create with AI' },
      { id: 'agent', icon: '🤖', label: 'Super Agent', badge: 'Hot' },
    ],
  },
  {
    group: 'content',
    items: [
      { id: 'doc',        icon: '📄', label: 'Doc' },
      { id: 'form',       icon: '📋', label: 'Form' },
      { id: 'dashboard',  icon: '📊', label: 'Dashboard' },
      { id: 'whiteboard', icon: '🖊', label: 'Whiteboard' },
      { id: 'clip',       icon: '📎', label: 'Clip' },
    ],
  },
  {
    group: 'footer',
    items: [
      { id: 'customize', icon: '⊞', label: 'Customize your sidebar' },
    ],
  },
];

// ─── Các mục điều hướng có sub-menu ───────────────────────────────────────────
const NAV_SECTIONS = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    IconComponent: DashboardIcon,
    subItems: [
      { id: 'd-1', label: 'Overview' },
      { id: 'd-2', label: 'Analytics' },
      { id: 'd-3', label: 'Reports' },
    ]
  },
  {
    id: 'tasks',
    label: 'Tasks',
    IconComponent: TasksIcon,
    subItems: [
      { id: 't-1', label: 'Assigned to me' },
      { id: 't-2', label: 'Today & Overdue' },
      { id: 't-3', label: 'Personal List' },
    ]
  },
  {
    id: 'teams',
    label: 'Teams',
    IconComponent: TeamsIcon,
    subItems: [
      { id: 'tm-1', label: 'Design Team' },
      { id: 'tm-2', label: 'Engineering' },
      { id: 'tm-3', label: 'Marketing' },
    ]
  },
];

// ─── Component chính Sidebar ──────────────────────────────────────────────────
const Sidebar = () => {
  const [expanded, setExpanded]         = useState(false);
  const [showCreate, setShowCreate]     = useState(false);
  const [createSearch, setCreateSearch] = useState('');
  
  const [hoveredNav, setHoveredNav]     = useState(null);
  const [openMenus, setOpenMenus]       = useState({
    dashboard: true,
    tasks: false,
    teams: false,
  });

  const createRef = useRef(null);

  // Đóng popup Create khi click ra ngoài
  useEffect(() => {
    const handleOutside = (e) => {
      if (createRef.current && !createRef.current.contains(e.target)) {
        setShowCreate(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  const toggleMenu = (id) => {
    setOpenMenus(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Lọc CREATE_ITEMS theo từ khoá tìm kiếm
  const filteredCreate = CREATE_ITEMS.map((section) => ({
    ...section,
    items: section.items.filter((item) =>
      item.label.toLowerCase().includes(createSearch.toLowerCase())
    ),
  })).filter((section) => section.items.length > 0);

  return (
    <div className={`sidebar-wrapper ${expanded ? 'sidebar-expanded' : 'sidebar-collapsed'}`}>

      {/* ══════════════════════════════════════════
          MINI SIDEBAR (collapsed, width 52px)
      ══════════════════════════════════════════ */}
      <nav className="mini-sidebar">
        {/* Lớp overlay trang trí màu (ẩn hiện theo theme) */}
        <div className="mini-sidebar-bg-glow"></div>

        <button
          className="mini-btn mini-btn--toggle"
          onClick={() => setExpanded(true)}
          title="Open sidebar"
          aria-label="Open sidebar"
        >
          <span className="mini-btn__icon">
            <SidebarExpandIcon />
          </span>
        </button>

        <button className="mini-btn" title="Dashboard" aria-label="Dashboard">
          <span className="mini-btn__icon"><DashboardIcon /></span>
          <span className="mini-btn__label">Dashboard</span>
        </button>

        <button className="mini-btn" title="Tasks" aria-label="Tasks">
          <span className="mini-btn__icon"><TasksIcon /></span>
          <span className="mini-btn__label">Tasks</span>
        </button>

        <button className="mini-btn" title="Teams" aria-label="Teams">
          <span className="mini-btn__icon"><TeamsIcon /></span>
          <span className="mini-btn__label">Teams</span>
        </button>
      </nav>

      {/* ══════════════════════════════════════════
          EXPANDED SIDEBAR (slide in/out)
      ══════════════════════════════════════════ */}
      <aside className="expanded-sidebar" aria-hidden={!expanded}>

        <div className="exp-header">
          <span className="exp-header__title">Workspace</span>

          <div className="create-wrapper" ref={createRef}>
            <button
              className="btn-create"
              onClick={() => setShowCreate((prev) => !prev)}
              aria-label="Create"
            >
              <span className="btn-create__plus">+</span>
              <svg className="btn-create__chevron" viewBox="0 0 10 6" fill="currentColor">
                <path d="M0 0l5 6 5-6z" />
              </svg>
            </button>

            {showCreate && (
              <div className="create-popup" role="dialog" aria-label="Create menu">
                <div className="create-popup__search">
                  <input
                    type="text"
                    placeholder="Describe anything to create"
                    value={createSearch}
                    onChange={(e) => setCreateSearch(e.target.value)}
                    autoFocus
                  />
                </div>

                <div className="create-popup__body">
                  {filteredCreate.map((section, si) => (
                    <div key={section.group} className="create-section">
                      {si === 0 && <p className="create-section__label">Create</p>}
                      {section.items.map((item) => (
                        <button key={item.id} className="create-item">
                          <span className="create-item__icon">{item.icon}</span>
                          <span className="create-item__info">
                            <span className="create-item__name">{item.label}</span>
                            {item.desc && (
                              <span className="create-item__desc">{item.desc}</span>
                            )}
                          </span>
                          {item.shortcut && (
                            <span className="create-item__shortcut">{item.shortcut}</span>
                          )}
                          {item.badge && (
                            <span className="create-item__badge">{item.badge}</span>
                          )}
                        </button>
                      ))}
                      {si < filteredCreate.length - 1 && (
                        <div className="create-section__divider" />
                      )}
                    </div>
                  ))}
                </div>

                <div className="create-popup__footer">
                  <button className="popup-footer-btn">↩ Import</button>
                  <button className="popup-footer-btn">⊞ Templates</button>
                </div>
              </div>
            )}
          </div>

          <button
            className="btn-close-sidebar"
            onClick={() => setExpanded(false)}
            title="Close sidebar"
            aria-label="Close sidebar"
          >
            <SidebarCloseIcon />
          </button>
        </div>

        <nav className="exp-nav">
          {NAV_SECTIONS.map((section) => {
            const { id, label, IconComponent, subItems } = section;
            const isOpen = openMenus[id];
            const isHovered = hoveredNav === id;

            return (
              <div key={id} className="nav-section-wrapper">
                <button
                  className={`exp-nav__item ${isOpen ? 'active-section' : ''}`}
                  onMouseEnter={() => setHoveredNav(id)}
                  onMouseLeave={() => setHoveredNav(null)}
                  onClick={() => toggleMenu(id)}
                >
                  <span className="exp-nav__icon-wrapper">
                    {/* Icon gốc */}
                    <span className={`exp-nav__icon original-icon ${isHovered ? 'hide' : 'show'}`}>
                      <IconComponent />
                    </span>
                    {/* Icon tam giác */}
                    <span className={`exp-nav__icon hover-icon ${isHovered ? 'show' : 'hide'}`}>
                      <TriangleIcon isOpen={isOpen} />
                    </span>
                  </span>
                  <span className="exp-nav__label">{label}</span>
                </button>

                {/* Danh sách con với animation mượt */}
                <div className={`sub-nav-wrapper ${isOpen ? 'is-open' : ''}`}>
                  <div className="sub-nav-inner">
                    {subItems.map(sub => (
                      <a href={`#${sub.id}`} key={sub.id} className="sub-nav-item">
                        {sub.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </nav>
      </aside>

    </div>
  );
};

export default Sidebar;
