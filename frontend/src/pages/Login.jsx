import React from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../AuthContext";
import axios from "axios";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import Toastify from "../utils/Toastify";
const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/login",
        data
      );
      login(response.data.data.token);
      navigate("/dashboard");
      Toastify.success("User login successfull");
    } catch (error) {
      Toastify.error(error.response.data.error);
      // console.error(error.response.data.error, "---------------------");
    }
  };

  return (
    <div className="container-box">
      <h2 className="a-title">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="form-container">
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
        <button type="submit" className="a-button">
          Login
        </button>
      </form>
      <div class="text-sm font-medium text-gray-500 dark:text-gray-300 mt-3">
        Not registered?{" "}
        <Link
          to={"/signup"}
          class="text-blue-700 hover:underline dark:text-blue-500"
        >
          Create account
        </Link>
      </div>
    </div>
  );
};

export default Login;
