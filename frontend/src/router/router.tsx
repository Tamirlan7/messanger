import React from "react"
import { createBrowserRouter } from "react-router-dom";
import Home from "@/pages/Home/Home";
import Login from "@/pages/Login/Login";
import Register from "@/pages/Register/Register";
import { wrapCheckAuth } from "@/hocs/CheckAuth";


export const router = createBrowserRouter([
    {
        path: '/login',
        element: (wrapCheckAuth(<Login />)),
    },
    {
        path: '/register',
        element: wrapCheckAuth(<Register />),
    },
    {
        path: '/',
        element: wrapCheckAuth(<Home />),
    },
])
