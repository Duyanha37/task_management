import './Tasks.css';

const Assigned = () =>{
    return (
        <div className="grid-item">
            <div className="assigned-header">
                <span className="header-text">Assigned to me</span>
            </div>
            <div className="assigned-content">
            </div>
        </div>
    );
};

const MyTasks = (tasklist) =>{
    return (
        <div className="grid-item">
            <div className="mytasks-header">
                <span className="header-text">My Tasks</span>
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
        
        </div>
    );
};

const Tasks = () => {
  return (
    <div className="tasks">
        <div className="grid-container">
            <MyTasks />
            <Assigned />
        </div>
    </div>
  );
};

export default Tasks;