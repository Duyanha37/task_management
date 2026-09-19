import './Tasks.css';
import { useState, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext.jsx';
import { useContext } from 'react';
import TodoIcon from '../assets/circle-todo.svg?react';
import InProgressIcon from '../assets/circle-inprogress.svg?react';
import DoneIcon from '../assets/circle-done.svg?react';
import TrashIcon from '../assets/trash.svg?react';
import AssignIcon from '../assets/teams.svg?react';
import CalendarIcon from '../assets/calendar.svg?react';
import FlagIcon from '../assets/flag-priority.svg?react';
import AddIcon from '../assets/add.svg?react';
import ChevronDownIcon from '../assets/chevron-down.svg?react'

const Assigned = () => {
    return (
        <div className="grid-item">
            <div className="tab-header">
                <span className="header-text">Assigned to me</span>
            </div>
            <div className="assigned-content">
            </div>
        </div>
    );
};

const MyTasks = ({ tasklist, handleTodoClick, handleInProgressClick, handleCompletedClick, status, onTaskClick, setTasklist, accessToken, onAddClick }) => {
    const statustasklist = tasklist.filter(task => task.status === status);
    
    return (
        <div className="grid-item">
            <div className="tab-header">
                <span className="header-text">My Tasks</span>
                <AddIcon className="add-icon" onClick={onAddClick} />
            </div>
            <div className="mytasks-tab">
                <button onClick={handleTodoClick} className={`mytasks-tab ${status === 'To Do' ? 'active' : ''}`}>To Do</button>
                <button onClick={handleInProgressClick} className={`mytasks-tab ${status === 'In Progress' ? 'active' : ''}`}>In Progress</button>
                <button onClick={handleCompletedClick} className={`mytasks-tab ${status === 'Completed' ? 'active' : ''}`}>Completed</button>
            </div>
            <div className="mytasks-content">
                {statustasklist.map((item) => (
                    <TaskItem key={item.id} {...item} onTaskClick={onTaskClick} setTasklist={setTasklist} tasklist={tasklist} accessToken={accessToken} />
                ))}
            </div>
        </div>
    );
};

const TaskItem = ({ onTaskClick, setTasklist, tasklist, accessToken, ...item }) => {
    const statusicon = {
        "To Do": TodoIcon,
        "In Progress": InProgressIcon,
        "Completed": DoneIcon
    };
    const StatusIcon = statusicon[item.status];
    const date = new Date(item.date);
    const formatDate = date.toLocaleDateString("vi-VN");

    const [showAssign, setShowAssign] = useState(false);
    const [showDate, setShowDate] = useState(false);
    const [showPriority, setShowPriority] = useState(false);
    const [showStatus, setShowStatus] = useState(false);

    const handleActionClick = (e, action) => {
        e.stopPropagation();
        if (action === 'assign') {
            setShowAssign(!showAssign);
            setShowDate(false);
            setShowPriority(false);
        }
        if (action === 'date') {
            setShowDate(!showDate);
            setShowAssign(false);
            setShowPriority(false);
        }
        if (action === 'priority') {
            setShowPriority(!showPriority);
            setShowAssign(false);
            setShowDate(false);
        }
    };

    const handleStatusClick = (e) => {
        e.stopPropagation();
        setShowStatus(!showStatus);
    };

    const updateTaskStatus = async ({ newStatus, setTasklist, tasklist}) => {
        try {
            const response = await fetch(`http://localhost:3000/api/tasks/${item.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify({ categories_id: item.categories_id, title: item.title, description: item.description, date: item.date, priority: item.priority, status: newStatus })
            });
            if (!response.ok) {
                console.error('Failed to update task status');
                return;
            }

            const data = await response.json();
            const newmapList = tasklist.map(task => {
                if (task.id === item.id) {
                    return data.task;
                }
                return task;
            });
            setTasklist(newmapList);
        } catch(error) {
            console.error(error);
        }
    };

    return (
        <div className="task-item" onClick={() => onTaskClick(item)}>
            <div className="task-left">
                <div className="task-status" onClick={handleStatusClick}>
                    {StatusIcon && <StatusIcon className="status-icon" />}
                    {showStatus && (
                        <div className="popup-menu-status status-popup" onClick={e => e.stopPropagation()} onMouseLeave={() => setShowStatus(false)}>
                            <div className="popup-item" onClick={() => updateTaskStatus({ newStatus: 'To Do', setTasklist, tasklist })}><TodoIcon className="status-icon" /> To Do</div>
                            <div className="popup-item" onClick={() => updateTaskStatus({ newStatus: 'In Progress', setTasklist, tasklist })}><InProgressIcon className="status-icon" /> In Progress</div>
                            <div className="popup-item" onClick={() => updateTaskStatus({ newStatus: 'Completed', setTasklist, tasklist })}><DoneIcon className="status-icon" /> Completed</div>
                        </div>
                    )}
                </div>
                <div className="task-title-group">
                    <span className="task-title">{item.title}</span>
                </div>
            </div>

            <div className="task-right">
                <div className="task-default-info">
                    <span className="task-date">{formatDate}</span>
                    <FlagIcon className="task-flag-icon" />
                </div>

                <div className="task-actions">
                    <button onClick={(e) => handleActionClick(e, 'delete')} className="action-btn"><TrashIcon /></button>

                    <div className="action-popup-container">
                        <button onClick={(e) => handleActionClick(e, 'assign')} className="action-btn"><AssignIcon /></button>
                        {showAssign && (
                            <div className="popup-menu assign-popup" onClick={e => e.stopPropagation()} onMouseLeave={() => setShowAssign(false)}>
                                <div className="popup-search">
                                    <input type="text" placeholder="Search or enter email..." />
                                </div>
                                <div className="popup-header">Assignees</div>
                                <div className="popup-item">Me</div>
                            </div>
                        )}
                    </div>

                    <div className="action-popup-container">
                        <button onClick={(e) => handleActionClick(e, 'date')} className="action-btn"><CalendarIcon /></button>
                        {showDate && (
                            <div className="popup-menu date-popup" onClick={e => e.stopPropagation()} onMouseLeave={() => setShowDate(false)}>
                                <div className="date-popup-header">
                                    <div className="date-tab">Start date</div>
                                    <div className="date-tab active">8/5/26 &times;</div>
                                </div>
                                <div className="date-popup-body">
                                    <div className="date-shortcuts">
                                        <div className="popup-item">Today</div>
                                        <div className="popup-item">Tomorrow</div>
                                        <div className="popup-item">Next week</div>
                                    </div>
                                    <div className="date-calendar-placeholder">
                                        <div className="calendar-month">August 2026</div>
                                        <div className="calendar-days">
                                            <span>5</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="action-popup-container">
                        <button onClick={(e) => handleActionClick(e, 'priority')} className="action-btn"><FlagIcon /></button>
                        {showPriority && (
                            <div className="popup-menu priority-popup" onClick={e => e.stopPropagation()} onMouseLeave={() => setShowPriority(false)}>
                                <div className="popup-item">Urgent</div>
                                <div className="popup-item">High</div>
                                <div className="popup-item">Normal</div>
                                <div className="popup-item">Low</div>
                                <div className="popup-item">Clear</div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const CreateTaskModal = ({ onClose }) => {
    const [showLocationPopup, setShowLocationPopup] = useState(false);
    const [showMorePopup, setShowMorePopup] = useState(false);

    return (
        <div className="task-detail-overlay" onClick={onClose}>
            <div className="create-task-modal" onClick={e => e.stopPropagation()}>
                <div className="create-task-header">
                    <button className="create-task-close" onClick={onClose}>&times;</button>
                </div>
                <div className="create-task-body">
                    <div className="create-task-location">
                        <div className="location-picker-wrapper" 
                            onClick={() => setShowLocationPopup(!showLocationPopup)}>
                            <div className="location-btn">
                                <AssignIcon className="location-icon" />
                                <span>Personal List</span>
                                <ChevronDownIcon className="chevron-icon"/>
                            </div>
                            {showLocationPopup && (
                                <div className="popup-menu location-popup" onClick={e => e.stopPropagation()}> {/*List popup task location*/}
                                    <div className="popup-item">Personal List</div>
                                    <div className="popup-item">Team Space</div>
                                </div>
                            )}
                        </div>
                    </div>
                    
                    <div className="create-task-inputs">
                        <input type="text" className="create-task-title" placeholder="Task Name" />
                        <textarea className="create-task-desc" placeholder="Add description, or write with AI"></textarea>
                    </div>
                    
                    <div className="create-task-properties">
                        <button className="property-btn status-btn">TO DO</button>
                        <button className="property-btn assignee-btn"><div className="assignee-avatar">OA</div></button>
                        <button className="property-btn date-btn"><CalendarIcon className="prop-icon"/> Due date</button>
                        <button className="property-btn priority-btn"><FlagIcon className="prop-icon"/> Priority</button>
                        
                        <div className="action-popup-container">
                            <button className="property-btn more-btn" onClick={() => setShowMorePopup(!showMorePopup)}>...</button>
                            {showMorePopup && (
                                <div className="popup-menu" onClick={e => e.stopPropagation()} style={{top: '100%', left: 0}}>
                                    <div className="popup-item">Duplicate</div>
                                    <div className="popup-item">Copy Link</div>
                                    <div className="popup-item">Delete</div>
                                </div>
                            )}
                        </div>
                    </div>
                    
                    <div className="create-task-fields">
                        <div className="fields-title">Fields</div>
                        <button className="add-field-btn">+ Create new field</button>
                    </div>
                </div>
                <div className="create-task-footer">
                    <div className="footer-left"></div>
                    <div className="footer-right">
                        <button className="create-submit-btn">Create Task</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Tasks = () => {
    const [status, setStatus] = useState('To Do');
    const [tasklist, setTasklist] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const { accessToken } = useContext(AuthContext);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/tasks', {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
                const data = await response.json();
                if (response.ok) {
                    setTasklist(data.tasks);
                    console.log('Fetched tasks successfully:');
                }
                else {
                    console.error('Failed to fetch tasks:', data.error, accessToken);
                }
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        if (!accessToken) return;

        fetchTasks();
    }, [accessToken]);

    const handleTodoClick = () => {
        setStatus('To Do');
    }

    const handleInProgressClick = () => {
        setStatus('In Progress');
    }

    const handleCompletedClick = () => {
        setStatus('Completed');
    }

    const handleTaskClick = (task) => {
        setSelectedTask(task);
    };

    const closeTaskPopup = () => {
        setSelectedTask(null);
    };

    return (
        <div className="tasks">
            <div className="grid-container">
                <MyTasks tasklist={tasklist} handleTodoClick={handleTodoClick} handleInProgressClick={handleInProgressClick} handleCompletedClick={handleCompletedClick} status={status} onTaskClick={handleTaskClick} setTasklist={setTasklist} accessToken={accessToken} onAddClick={() => setIsCreateModalOpen(true)} />
                <Assigned />
            </div>

            {selectedTask && (
                <div className="task-detail-overlay" onClick={closeTaskPopup}>
                    <div className="task-detail-modal" onClick={e => e.stopPropagation()}>
                        <button className="close-modal" onClick={closeTaskPopup}>&times;</button>
                        <h2>{selectedTask.title}</h2>
                        <p className="task-description">{selectedTask.description}</p>
                        <div className="placeholder-info">
                            <h3>Task details placeholder</h3>
                            <p>Status: {selectedTask.status}</p>
                            <p>Date: {new Date(selectedTask.date).toLocaleDateString("vi-VN")}</p>
                            <p>Priority: {selectedTask.priority}</p>
                            <p>Assignee: Me</p>
                        </div>
                    </div>
                </div>
            )}

            {isCreateModalOpen && <CreateTaskModal onClose={() => setIsCreateModalOpen(false)} />}
        </div>
    );
};

export default Tasks;