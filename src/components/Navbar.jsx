import React, { use } from 'react';
import { Link, NavLink } from 'react-router';
import userImg from '../assets/user.png'
import { AuthContext } from '../provider/authProvider';

const Navbar = () => {
    const { user, logout } = use(AuthContext);

    const handleLogout = ()=>{
        logout().then(() => {
            alert('Sign-out successful.')
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <div className='relative'>
            <div>{user && user.email}</div>
            <div className='flex justify-center'>
                <nav className='flex gap-4 text-accent'>
                    <NavLink to={'/'}>Home</NavLink>
                    <NavLink to={'/about'}>About</NavLink>
                    <NavLink to={'/career'}>Career</NavLink>
                </nav>
            </div>
            <div className='flex items-center gap-5 absolute -top-3 right-0'>
                <img className='w-10' src={`${user ? user.photoURL : userImg}`} alt="" />
                {
                    user ? <button onClick={handleLogout} className='btn btn-primary px-8'>LogOut</button> : <Link to={'/auth/login'} className='btn btn-primary px-8'>Login</Link>
                }
                
            </div>
        </div>
    );
};

export default Navbar;