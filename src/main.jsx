import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import React from "react";
import "./index.css";
import App from "./App.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";

import AssignJob from "./pages/AssignJob.jsx";
import ViewJob from "./pages/ViewJob.jsx";

import AdminRoute from "./protectedRoute/AdminRoute.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <AdminLogin /> },

      {
        path: "dashboard",
        element: (
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        ),
      },

      {
        path: "assign-job/:requestId",
        element: (
          <AdminRoute>
            <AssignJob />
          </AdminRoute>
        ),
      },

      {
        path: "job/view",
        element: (
          <AdminRoute>
            <ViewJob />
          </AdminRoute>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
