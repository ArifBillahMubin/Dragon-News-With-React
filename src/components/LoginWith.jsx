import React from 'react';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

const LoginWith = () => {
    return (
        <div>
            <h1 className='font-bold text-lg mb-3'>Login With</h1>
            <div className='grid grid-cols-1 gap-2'>
                <button className='btn btn-outline hover:bg-secondary'><FcGoogle size={24}/>Login with Google</button>
                <button className='btn btn-outline hover:bg-primary'><FaGithub size={24}/>Login with GitHub</button>
            </div>
        </div>
    );
};

export default LoginWith;