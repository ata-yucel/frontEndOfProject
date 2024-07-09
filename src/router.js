import { createBrowserRouter } from "react-router-dom"
import ManHome from "./pages/ManHome"
import Login from "./pages/Login"
import Error404 from "./pages/Error404"
import Register from "./pages/Register"
import Cart from "./pages/Cart"
import LayoutWithNavbar from "./layouts/LayoutWithNavbar"
import LayoutWithoutNavbar from "./layouts/LayoutWithoutNavbar"
import Profile from "./pages/Profile"
import WomanHome from "./pages/WomanHome"
import Home from "./pages/Home"
import ChangePassword from "./pages/ChangePassword"

import About from "./pages/About"
import Buy from "./pages/Buy"
import Orders from "./pages/Orders"

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutWithNavbar />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/manhome",
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
      {
        path: "/womanhome",
        element: <WomanHome />
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/orders",
        element: <Orders />,
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
        path: "/changePassword",
        element: <ChangePassword />
      },
      {
        path: "/buy",
        element: <Buy />
      },
      {
        path: "*",
        element: <Error404 />
      }
    ]
  }
])

export default router

