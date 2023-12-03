import { RouterProvider, createBrowserRouter } from "react-router-dom";
import type { Router as RemixRouter } from "@remix-run/router";

import { loginRoutes } from "./modules/login/routes.tsx";
import { useNotification } from "./shared/hooks/useNotification.ts";
import { firstScreenRoutes } from "./modules/firstScreen/routes.tsx";
import { produtScreens } from "./modules/product/routes.tsx";


const router: RemixRouter = createBrowserRouter([...firstScreenRoutes, ...produtScreens, ...loginRoutes]);

function App() {
  const { contextHolder } = useNotification();
  return (
    <>
      {contextHolder}
      <RouterProvider router={router} />
    </>
  )
}

export default App
