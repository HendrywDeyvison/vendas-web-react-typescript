import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { RouteObject, RouterProvider, createBrowserRouter } from "react-router-dom";
import type { Router as RemixRouter } from "@remix-run/router";

import { loginRoutes } from "./modules/login/routes.tsx";

const mainRoutes: RouteObject[] = [
  {
    path: "/",
    element: <div>Tela Principal</div>,
    errorElement: <div>Página de Erro</div>,
  },
];

const router: RemixRouter = createBrowserRouter([
  ...loginRoutes,
  ...mainRoutes,
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
