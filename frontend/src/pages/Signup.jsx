import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
import Toastify from "../utils/Toastify";
const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/signup",
        data
      );
      navigate("/login");
      Toastify.success("User Registered successfully");
    } catch (error) {
      Toastify.error(error?.response?.data?.error);
      console.error(error);
    }
  };

  return (
    <div className="container-box">
      <h2 className="a-title">Sign Up</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="form-container">
        <div>
          <label className="a-label">Username:</label>
          <input
            className="a-input"
            type="text"
            {...register("username", { required: "Name is required" })}
          />
          {errors.username && <p className="a-error">{errors.name.message}</p>}
        </div>
        <div>
          <label className="a-label">Email:</label>
          <input
            className="a-input"
            type="email"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && <p className="a-error">{errors.email.message}</p>}
        </div>
        <div>
          <label className="a-label">Password:</label>
          <input
            className="a-input"
            type="password"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && (
            <p className="a-error">{errors.password.message}</p>
          )}
        </div>
        <button className="a-button" type="submit">
          Sign Up
        </button>
      </form>
      <div class="text-sm font-medium text-gray-500 dark:text-gray-300 mt-3">
        Already have an accounnt?{" "}
        <Link
          to={"/login"}
          class="text-blue-700 hover:underline dark:text-blue-500"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default Signup;
