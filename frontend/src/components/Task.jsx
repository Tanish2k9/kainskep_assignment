import React from "react";
import "./Task.css";

const Task = ({
  task,
  setActiveTask,
  index,
  deleteTask,
  setViewTask,
  setShowEditTaskModal,
}) => {
  // console.log(task, "-------");
  return (
    // <div
    //   classNameNameName="task-container"
    //   draggable
    //   onDragStart={() => setActiveTask(task.id)}
    //   onDragEnd={() => setActiveTask(null)}
    // >
    //   <p>{task._id}</p>
    //   <p>{task.title}</p>
    //   <p>{task.content}</p>
    //   <p>{task.category}</p>
    // </div>
    <div
      className="card"
      draggable={true}
      onDragStart={(e) => {
        setActiveTask(task._id);
        // e.preventDefault();
      }}
      onDragEnd={(e) => {
        setActiveTask(null);
        e.preventDefault();
      }}
      // onDragOver={(e) => {
      //   e.preventDefault();
      // }}
    >
      <div className="card-content">
        <h3 className="card-title">{task.title}</h3>
        <p className="card-description">{task.content}</p>
      </div>
      <div className="card-actions">
        <i
          className="fas fa-eye action-icon"
          title="View"
          onClick={() => setViewTask(task._id)}
        ></i>
        <i
          className="fas fa-edit action-icon"
          title="Edit"
          onClick={() => setShowEditTaskModal(task._id)}
        ></i>
        <i
          className="fas fa-trash action-icon"
          title="Delete"
          onClick={() => deleteTask(task._id)}
        ></i>
      </div>
    </div>
  );
};

export default Task;
