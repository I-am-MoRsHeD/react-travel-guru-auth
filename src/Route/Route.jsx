// eslint-disable-next-line no-unused-vars
import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../Layout/MainLayout';
import Home from '../Pages/Home';
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import PrivateRoute from './PrivateRoute';
import Destination from '../Pages/Destination';
import TravelDetails from '../Components/TravelDetails/TravelDetails';

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: '/',
                element: <Home></Home>,
                loader: () => fetch('/travel.json')
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/destination',
                element: <PrivateRoute><Destination></Destination></PrivateRoute>
            },
            {
                path: '/travel/:id',
                element: <TravelDetails></TravelDetails>
            }
        ]
    }
])

export default router;