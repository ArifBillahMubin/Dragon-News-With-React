import React from 'react';
import logo from '../assets/logo.png'
import { format } from 'date-fns';

const Header = () => {
    return (
        <div className='flex flex-col justify-center items-center space-y-1 mt-10'>
            <img className='w-[350px]' src={logo} alt="" />
            <p className='text-accent'>Journalism Without Fear or Favour</p>
            <p className='text-xl font-semibold text-accent'>{format(new Date(), "EEEE, MMMM d, yyyy")}</p>
        </div>
    );
};

export default Header;