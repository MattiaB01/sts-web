import { Navigate, Outlet } from "react-router-dom";
import React from "react";

const ProtectedRoute = () => {
  const isAuthenticated = !!localStorage.getItem("authToken");
  return  isAuthenticated ? <Outlet /> : <Navigate to="/" replace />
  
};

export default ProtectedRoute;