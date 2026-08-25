import './Tasks.css';
import { useState } from 'react';

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

const MyTasks = ({tasklist, handleTodoClick, handleInProgressClick, handleCompletedClick, isTodo, isInProgress, isCompleted}) =>{
    return (
        <div className="grid-item">
            <div className="tab-header">
                <span className="header-text">My Tasks</span>
            </div>
            <div className="mytasks-tab">
                <button onClick={handleTodoClick} className={`mytasks-tab ${isTodo ? 'active' : ''}`}>To Do</button>
                <button onClick={handleInProgressClick} className={`mytasks-tab ${isInProgress ? 'active' : ''}`}>In Progress</button>
                <button onClick={handleCompletedClick} className={`mytasks-tab ${isCompleted ? 'active' : ''}`}>Completed</button>
            </div>
            <div className="mytasks-content">
                {tasklist.map((task) => (
                    <Task key={task.id} {...task} />
                ))}
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

    const [isTodo, setIsTodo] = useState(false);
    const [isInProgress, setIsInProgress] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);

    const handleTodoClick = () => {
        setIsTodo(true);
        setIsInProgress(false);
        setIsCompleted(false);
    }

    const handleInProgressClick = () => {
        setIsTodo(false);
        setIsInProgress(true);
        setIsCompleted(false);
    }

    const handleCompletedClick = () => {
        setIsTodo(false);
        setIsInProgress(false);
        setIsCompleted(true);
    }

    const tasklist = [
        { id: 1, title: 'Task 1', description: 'Description for Task 1' },
        { id: 2, title: 'Task 2', description: 'Description for Task 2' },
        { id: 3, title: 'Task 3', description: 'Description for Task 3' },
    ];
  return (
    <div className="tasks">
        <div className="grid-container">
            <MyTasks tasklist={tasklist} handleTodoClick={handleTodoClick} handleInProgressClick={handleInProgressClick} handleCompletedClick={handleCompletedClick} isTodo={isTodo} isInProgress={isInProgress} isCompleted={isCompleted} />
            <Assigned />
        </div>
    </div>
  );
};

export default Tasks;