// eslint-disable-next-line no-unused-vars
import React, { useContext } from 'react';
import { AuthContext } from '../Components/AuthContext/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    // const location = useLocation();
    // console.log(location)

    if(loading){
        return <div className='flex justify-center mt-80'>
            <span className="loading loading-spinner loading-lg"></span>
        </div>;
    }

    if (user) {
        return children;
    }
    return (
        <Navigate to='/login'></Navigate>
    )
};

export default PrivateRoute;