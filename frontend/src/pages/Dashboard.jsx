import { useEffect, useState } from "react";
import TaskCategory from "../components/TaskCategory";
import CreateTask from "../components/CreateTask";
import "./Dashboard.css";
import axios from "axios";
import Modal from "../components/Modal";
import ViewTask from "../components/ViewTask";
import EditTask from "../components/EditTask";
import { useAuth } from "../AuthContext";
import Toastify from "../utils/Toastify";
const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [activeTask, setActiveTask] = useState(null);
  const [showCreatTaskModal, setShowCreateTaskModal] = useState(false);
  const [showEditTaskModal, setShowEditTaskModal] = useState(null);
  const [viewTask, setViewTask] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const { logout } = useAuth();

  const fetchAllTasks = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get("http://localhost:8000/api/v1/task", {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in headers
        },
      });

      const tasks = response.data.data;
      setTasks(tasks || []);
    } catch (error) {
      if (error?.response?.data?.error) {
        Toastify.error(error?.response?.data?.error);
      } else {
        Toastify.error("Error occurred while fetching tasks");
      }
    }
  };

  const deleteTask = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `http://localhost:8000/api/v1/task/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in headers
          },
        }
      );
      Toastify.success("Task deleted successfully");

      fetchAllTasks();
    } catch (error) {
      if (error?.response?.data?.error) {
        Toastify.error(error?.response?.data?.error);
      } else {
        Toastify.error("Error occurred while deleting task");
      }
    }
  };

  const updateStatus = async (id, status) => {
    const data = {
      status: status,
    };
    const token = localStorage.getItem("token");
    try {
      const response = await axios.patch(
        `http://localhost:8000/api/v1/task/${id}/status`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in headers
          },
        }
      );
      return true;
    } catch (error) {
      if (error?.response?.data?.error) {
        Toastify.error(error?.response?.data?.error);
      } else {
        Toastify.error("Error occurred while drag and drop");
      }
      return false;
    }
  };

  useEffect(() => {
    fetchAllTasks();
    // console.log("all");
  }, [refresh]);

  const onDrop = (status, position) => {
    if (activeTask == null || activeTask === undefined) return;

    const ok = updateStatus(activeTask, status);
    if (ok) {
      let taskToMove = tasks.filter((task) => task._id === activeTask);
      taskToMove = taskToMove[0];

      const updatedTasks = tasks.filter((task, index) => {
        console.log(task._id !== activeTask);
        return task._id !== activeTask;
      });
      updatedTasks.splice(position, 0, {
        ...taskToMove,
        status: status,
      });

      setTasks(updatedTasks);
    }
  };

  return (
    <>
      <header>
        <div className=" global-wrapper content-container">
          <h3 className=" logo whitespace-nowrap">Task Management</h3>
          <div className="flex gap-2">
            <button
              onClick={() => setShowCreateTaskModal(true)}
              className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button"
            >
              createTask
            </button>

            <button
              onClick={() => logout()}
              className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className=" global-wrapper main-container">
        <div className="task-container-wrapper">
          <TaskCategory
            tasks={tasks}
            status={"todo"}
            setActiveTask={setActiveTask}
            onDrop={onDrop}
            deleteTask={deleteTask}
            setViewTask={setViewTask}
            setShowEditTaskModal={setShowEditTaskModal}
          />
          <TaskCategory
            tasks={tasks}
            status={"inprogress"}
            setActiveTask={setActiveTask}
            onDrop={onDrop}
            deleteTask={deleteTask}
            setViewTask={setViewTask}
            setShowEditTaskModal={setShowEditTaskModal}
          />
          <TaskCategory
            tasks={tasks}
            status={"completed"}
            setActiveTask={setActiveTask}
            onDrop={onDrop}
            deleteTask={deleteTask}
            setViewTask={setViewTask}
            setShowEditTaskModal={setShowEditTaskModal}
          />
        </div>
      </main>

      {showCreatTaskModal && (
        <Modal
          title="create task"
          setShowCreateTaskModal={setShowCreateTaskModal}
        >
          <CreateTask
            setRefresh={setRefresh}
            setShowCreateTaskModal={setShowCreateTaskModal}
          />
        </Modal>
      )}

      {viewTask && (
        <Modal
          title="create task"
          setShowCreateTaskModal={setShowCreateTaskModal}
        >
          <ViewTask viewTask={viewTask} setViewTask={setViewTask} />
        </Modal>
      )}

      {showEditTaskModal && (
        <Modal title="create task" setShowEditTaskModal={setShowEditTaskModal}>
          <EditTask
            showEditTaskModal={showEditTaskModal}
            setRefresh={setRefresh}
            setShowEditTaskModal={setShowEditTaskModal}
          />
        </Modal>
      )}
    </>
  );
};

export default Dashboard;
