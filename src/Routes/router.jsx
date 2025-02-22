import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import SignUp from "../Pages/SignUp";
import Login from "../Pages/Login";
import Board from "../Componets/Board";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
    {
        path : '/',
        element : <MainLayout></MainLayout>,
        children : [
            {
                path : '',
                element : <PrivateRoute><Board></Board></PrivateRoute>
            },
            {
                path : 'login',
                element : <Login></Login>
            },
            {
                path : "signUp",
                element : <SignUp></SignUp>
            }
        ]
    }
])

export default router