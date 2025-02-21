import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import SignUp from "../Pages/SignUp";
import Login from "../Pages/Login";
import Board from "../Componets/Board";

const router = createBrowserRouter([
    {
        path : '/',
        element : <MainLayout></MainLayout>,
        children : [
            {
                path : '',
                element : <Board></Board>
            },
            {
                path : 'login',
                element : <Login></Login>
            }
        ]
    }
])

export default router