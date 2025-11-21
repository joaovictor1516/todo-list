import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { TodoList } from "./pages/todo-list";
import { Register } from "./pages/register";
import { Login } from "./pages/login";
import { Error } from "./pages/error";
import "./index.css";

export function App() {
const router = createBrowserRouter([
  {
    path: "/",
    element: <TodoList/>,
    errorElement: <Error/>
  },
  {
    path: "/login",
    element: <Login/>,
    errorElement: <Error/>
  },
  {
    path: "/register",
    element: <Register/>,
    errorElement: <Error/>
  }
])

  return (
    <RouterProvider router={router}/>
  )
}