// src/App.jsx (when AuthProvider is in main.jsx)
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import PrivateRoute from "./components/PrivateRoute";
import AppLayout from "./components/AppLayout";
import LandingPage from "./components/LandingPage";
import BlogListPage from "./components/BlogListPage";
import LoginPage from "./components/LoginPage";
import AddBlogPage from "./components/AddBlogPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "blogs", element: <PrivateRoute><BlogListPage /></PrivateRoute> },
      { path: "add", element: <PrivateRoute><AddBlogPage /></PrivateRoute> },
    ]
  }
]);

export default function App() {
  return <RouterProvider router={router} />;
}
