import React from "react";

import { Navigate, Outlet, Route } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({ element, children }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};
export default ProtectedRoute;
