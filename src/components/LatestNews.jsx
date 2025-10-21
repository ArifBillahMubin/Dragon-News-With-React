import React from 'react';
import Marquee from 'react-fast-marquee';

const LatestNews = () => {
    return (
        <div className='bg-base-200 flex gap-5 items-center mt-5 p-3'>
            <h1 className='bg-secondary text-base-100 px-4 py-2'>Latest</h1>
            <Marquee className='' pauseOnClick>
                <p className='font-semibold ml-5'>Match Highlights: Germany vs Spain — as it happened   !</p>
                <p className='font-semibold ml-5'>Match Highlights: Germany vs Spain — as it happened   !</p>
                <p className='font-semibold ml-5'>Match Highlights: Germany vs Spain — as it happened   !</p>
            </Marquee>
        </div>
    );
};

export default LatestNews;