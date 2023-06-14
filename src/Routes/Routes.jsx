
import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import AddTask from "../Pages/AddTask/AddTask";
import PrivateRoute from "./PrivateRoute";
import MyTask from "../Pages/MyTask/MyTask";
import UpdateTask from "../Pages/UpdateTask/UpdateTask";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: 'login',
                element: <Login></Login>
            },
            {
                path: 'register',
                element: <Register></Register>
            },
            {
                path: 'addTask',
                element: <PrivateRoute><AddTask></AddTask></PrivateRoute>
            },
            {
                path: 'myTask',
                element: <PrivateRoute><MyTask></MyTask></PrivateRoute>
            },
            {
                path: '/myTask/updateTask/:id',
                element: <UpdateTask></UpdateTask>,
                loader: ({params}) => fetch(`https://task-management-backend-ashy.vercel.app/allTask/${params.id}`)
            }
        ]
    }
])


export default router;