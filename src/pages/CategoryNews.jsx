import React, { useEffect, useState } from 'react';
import { useLoaderData, useParams } from 'react-router';
import NewsCard from '../components/NewsCard';

const CategoryNews = () => {
    const { id } = useParams();
    const allNews = useLoaderData();

    const [categoryNews,setCategoryNews] = useState([]);
    // console.log(id,allNews);

    useEffect(()=>{
        if(id== '0'){
            setCategoryNews(allNews);
        }else if(id == '1'){
            const filterNews = allNews.filter(news => news.others.is_today_pick == true);
            setCategoryNews(filterNews)
        }else{
            const filterNews = allNews.filter(news => news.category_id == id);
            setCategoryNews(filterNews)
        }
    },[allNews,id]);

    return (
        <div>
            <h1 className='text-lg font-bold'>Total <span className='text-secondary'>{categoryNews.length} </span> news found</h1>
            <div className='grid grid-cols-1 gap-5'>
                {
                    categoryNews.map(news => <NewsCard key={news.id} news={news}></NewsCard>)
                }
            </div>
        </div>
    );
};

export default CategoryNews;