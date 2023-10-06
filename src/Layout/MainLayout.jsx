// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Outlet } from 'react-router-dom';


const MainLayout = () => {
    return (
        <div className='max-w-6xl mx-auto'>
            <Outlet></Outlet>
        </div>
    );
};

export default MainLayout;