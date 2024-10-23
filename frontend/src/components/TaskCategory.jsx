import React from "react";
import "./TaskCategory.css";
import Task from "./task";
import { DropTask } from "./DropTask";

const TaskCategory = ({
  tasks,
  status,
  setActiveTask,
  onDrop,
  deleteTask,
  setViewTask,
  setShowEditTaskModal,
}) => {
  const filterData = tasks.filter((task) => task.status === status);
  return (
    <>
      <div className="task-category-conntainer">
        <h3 className="tc-status text-2xl uppercase">{status}</h3>

        <DropTask
          onDrop={() => onDrop(status, 0)}
          fullheight={filterData.length === 0}
        />
        {filterData.map((task, index) => {
          return (
            <React.Fragment key={task._id}>
              <Task
                task={task}
                setActiveTask={setActiveTask}
                index={index}
                deleteTask={deleteTask}
                setViewTask={setViewTask}
                setShowEditTaskModal={setShowEditTaskModal}
              />
              <DropTask
                onDrop={() => onDrop(status, index + 1)}
                fullheight={tasks.length === 0}
              />
            </React.Fragment>
          );
        })}
      </div>
    </>
  );
};

export default TaskCategory;
