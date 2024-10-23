import axios from "axios";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Toastify from "../utils/Toastify";

const EditTask = ({ showEditTaskModal, setShowEditTaskModal, setRefresh }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:8000/api/v1/task/${showEditTaskModal}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in headers
          },
        }
      ); // Replace with your API endpoint
      // console.log("Success:", response.data);

      // onClose(); // Close modal after successful submission
      setRefresh((prev) => !prev);
      setShowEditTaskModal(null);
      Toastify.success("Task edited successfully");
    } catch (error) {
      if (error?.response?.data?.error) {
        Toastify.error(error?.response?.data?.error);
      } else {
        Toastify.error("Error submitting data");
      }
      // console.error("Error submitting data:", error);
      // Optionally handle error display
    }
  };

  const getTask = async (id) => {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `http://localhost:8000/api/v1/task/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in headers
        },
      }
    );
    reset(response.data.data);
  };

  useEffect(() => {
    getTask(showEditTaskModal);
  }, []);
  return (
    <>
      <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          Edit Task
        </h3>
        <button
          type="button"
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          onClick={() => setShowEditTaskModal(false)}
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
      <form onSubmit={handleSubmit(onSubmit)} className="form-container">
        <div>
          <label htmlFor="title" className="a-label">
            Title:
          </label>
          <input
            className="a-input"
            id="title"
            {...register("title", {
              required: "Title is required",
            })}
          />
          {errors.title && (
            <span className="a-error">{errors.title.message}</span>
          )}
        </div>

        <div>
          <label htmlFor="content" className="a-label">
            Content:
          </label>
          <textarea
            className="a-input"
            id="content"
            {...register("content", {
              required: "Content is required",
            })}
          />
          {errors.content && (
            <span className="a-error">{errors.content.message}</span>
          )}
        </div>

        <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default EditTask;
