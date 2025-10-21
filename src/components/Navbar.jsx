import React from 'react';
import { NavLink } from 'react-router';
import user from '../assets/user.png'

const Navbar = () => {
    return (
        <div className='relative'>
            <div className='flex justify-center'>
                <nav className='flex gap-4 text-accent'>
                    <NavLink to={'/'}>Home</NavLink>
                    <NavLink to={'/about'}>About</NavLink>
                    <NavLink to={'/career'}>Career</NavLink>
                </nav>
            </div>
            <div className='flex items-center gap-5 absolute -top-3 right-0'>
                <img src={user} alt="" />
                <button className='btn btn-primary px-8'>Login</button>
            </div>
        </div>
    );
};

export default Navbar;