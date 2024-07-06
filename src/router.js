

import { createBrowserRouter } from "react-router-dom"
import ManHome from "./pages/ManHome"
import Login from "./pages/Login"
import Error404 from "./pages/Error404"
import Register from "./pages/Register"
import Cart from "./pages/Cart"
import LayoutWithNavbar from "./layouts/LayoutWithNavbar"
import LayoutWithoutNavbar from "./layouts/LayoutWithoutNavbar"
import Profile from "./pages/Profile"

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutWithNavbar />,
    children: [
      {
        path: "/",
        element: <ManHome />,
      },
      {
        path: "/cart",
        element: <Cart />
      },
      {
        path: "/profile",
        element: <Profile />
      },
    ]
  },
  {
    path: "/",
    element: <LayoutWithoutNavbar />,
    children: [
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/register",
        element: <Register />
      },

      {
        path: "*",
        element: <Error404 />
      }
    ]
  }
])

export default router

