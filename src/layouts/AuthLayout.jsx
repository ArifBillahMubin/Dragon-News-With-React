import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router';

const AuthLayout = () => {
    return (
        <div>
            <header className='w-11/12 mx-auto py-10'>
                <Navbar></Navbar>
            </header>
            <main className='w-11/12 mx-auto py-10'>
                <Outlet></Outlet>
            </main>
        </div>
    );
};

export default AuthLayout;