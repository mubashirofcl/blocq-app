import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import PrivateRoute from "./components/PrivateRoute";
import AppLayout from "./layouts/AppLayout";

import LandingPage from "./pages/LandingPage";
import BlogListPage from "./pages/BlogListPage";
import AddBlogPage from "./pages/AddBlogPage";
import EditBlogPage from "./pages/EditBlogPage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";

import { LoaderProvider } from "./context/LoaderContext";
import GlobalLoader from "./components/GlobalLoader";
import "./index.css";


const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <LandingPage /> },

      { path: "login", element: <LoginPage /> },

      { path: "blogs", element: <BlogListPage /> },

      { path: "add", element: <PrivateRoute> <AddBlogPage /> </PrivateRoute> },

      { path: "edit/:id", element: <PrivateRoute> <EditBlogPage /> </PrivateRoute> },

      { path: "*", element: <NotFoundPage /> }
    ]
  }
]);

export default function App() {
  return (
    <LoaderProvider>
      <GlobalLoader />   {/* <-- MUST be here */}
      <RouterProvider router={router} />
    </LoaderProvider>
  );
}


