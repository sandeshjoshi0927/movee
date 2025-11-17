import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MovieDetailsPage from "./pages/MovieDetailsPage.jsx";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/movie/:id", element: <MovieDetailsPage /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
