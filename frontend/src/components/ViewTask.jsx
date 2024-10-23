import axios from "axios";
import React, { useEffect, useState } from "react";
import Toastify from "../utils/Toastify";

const ViewTask = ({ viewTask, setViewTask }) => {
  const [task, setTask] = useState(null);
  const getTask = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/task/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in headers
          },
        }
      );
      setTask(response.data.data);
    } catch (error) {
      if (error?.response?.data?.error) {
        Toastify.error(error?.response?.data?.error);
      } else {
        Toastify.error("Error occurred while getting task");
      }
    }
  };

  useEffect(() => {
    getTask(viewTask);
  }, []);
  return (
    <>
      <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          View Task
        </h3>
        <button
          type="button"
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          onClick={() => setViewTask(null)}
        >
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span className="sr-only">Close modal</span>
        </button>
      </div>

      <div>
        <h2 className="text-2xl">{task?.title}</h2>
        <p>{task?.content}</p>
        <button
          type="button"
          className="text-white my-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {task?.status}
        </button>
      </div>
    </>
  );
};

export default ViewTask;
