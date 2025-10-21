import React from 'react';
import swimming from '../assets/swimming.png'
import classImg from '../assets/class.png'
import playGround from '../assets/playground.png'

const QZone = () => {
    return (
        <div className='mt-8 bg-base-300 p-4'>
            <h1 className='text-lg font-bold '>Q-Zone</h1>
            <div>
                <img src={swimming} alt="" className='w-full'/>
                <img src={classImg} alt="" className='w-full'/>
                <img src={playGround} alt="" className='w-full'/>
            </div>
        </div>
    );
};

export default QZone;