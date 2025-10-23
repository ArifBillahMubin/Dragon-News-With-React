import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import RightAside from '../components/HomeLayout/RightAside';
import NewsDetailsCard from '../components/NewsDetailsCard';
import { useLoaderData, useParams } from 'react-router';

const NewsDetails = () => {
    const [news,setNews] = useState([]);
    const data = useLoaderData();
    const {id} = useParams();
    // console.log(news);
    useEffect(()=>{
        const findNews = data.find(news => news.id == id);
        setNews(findNews);
    },[data,id])
    return (
        <div>
            <header className=''>
                <Header></Header>
            </header>
            <main className='w-11/12 mx-auto grid grid-cols-12 gap-5 py-10'>
                <section className='col-span-9'>
                    <h1 className='text-xl font-bold'>News details</h1>
                    <NewsDetailsCard news={news}></NewsDetailsCard>
                </section>
                <aside className='col-span-3'>
                    <RightAside></RightAside>
                </aside>
            </main>
        </div>
    );
};

export default NewsDetails;