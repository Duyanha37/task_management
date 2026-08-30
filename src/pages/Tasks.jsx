import './Tasks.css';
import { useState, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext.jsx';
import { useContext } from 'react';
import TodoIcon from '../assets/circle-todo.svg?react';
import InProgressIcon from '../assets/circle-inprogress.svg?react';
import DoneIcon from '../assets/circle-done.svg?react';

const Assigned = () =>{
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

const MyTasks = ({tasklist, handleTodoClick, handleInProgressClick, handleCompletedClick, status}) =>{
    return (
        <div className="grid-item">
            <div className="tab-header">
                <span className="header-text">My Tasks</span>
            </div>
            <div className="mytasks-tab">
                <button onClick={handleTodoClick} className={`mytasks-tab ${status === 'todo' ? 'active' : ''}`}>To Do</button>
                <button onClick={handleInProgressClick} className={`mytasks-tab ${status === 'inprogress' ? 'active' : ''}`}>In Progress</button>
                <button onClick={handleCompletedClick} className={`mytasks-tab ${status === 'completed' ? 'active' : ''}`}>Completed</button>
            </div>
            <div className="mytasks-content">
                <h1>Số task: {tasklist.length}</h1>
            </div>
        </div>
    );
};

const Task = (item) => {
    return (
        <div className="task-item">
            <div className="task-status">
                <svg className="status-icon"></svg>
            </div>
        </div>
    );
};

const Tasks = () => {
    const [status, setStatus] = useState('todo');
    const [tasklist, setTasklist] = useState([]);
    const { accessToken } = useContext(AuthContext);

    useEffect(() => {
        console.log('Access Token:', accessToken); // Log the access token for debugging
         const fetchTasks = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/tasks', {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
                console.log('Response status:', response.status); // Log the response status for debugging
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
        setStatus('todo');
    }

    const handleInProgressClick = () => {
        setStatus('inprogress');
    }

    const handleCompletedClick = () => {
        setStatus('completed');
    }

  return (
    <div className="tasks">
        <div className="grid-container">
            <MyTasks tasklist={tasklist} handleTodoClick={handleTodoClick} handleInProgressClick={handleInProgressClick} handleCompletedClick={handleCompletedClick} status={status} />
            <Assigned />
        </div>
    </div>
  );
};

export default Tasks;