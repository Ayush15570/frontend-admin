import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";

import React from "react";
const AdminRoute = ({ children }) => {
  const [status, setStatus] = useState("checking"); 
  // checking | authorized | unauthorized

  useEffect(() => {
    let active = true;

    api.get("/admin/check-session")
      .then(() => {
        if (active) setStatus("authorized");
      })
      .catch(() => {
        if (active) setStatus("unauthorized");
      });

    return () => {
      active = false;
    };
  }, []);

  if (status === "checking") {
    return <div className="p-6">Checking admin session…</div>;
  }

  if (status === "unauthorized") {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default AdminRoute;
