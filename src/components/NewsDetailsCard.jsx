import React from 'react';
import { Link } from 'react-router';

const NewsDetailsCard = ({ news }) => {
    return (
        <div className='space-y-4 mt-5'>
            <img className='w-full h-[450px] object-cover' src={news.image_url} alt="" />
            <h1 className='text-3xl mb-2'>{news.title}</h1>
            <p>{news.details}</p>
            <Link className=' btn bg-secondary' to={`/category/${news.category_id
                }`}>Back to Category</Link>
        </div>
    );
};

export default NewsDetailsCard;