import React, { use } from 'react';
import { NavLink } from 'react-router';
import { API_ENDPOINTS } from '../config/api';

const categoryPromise = fetch(API_ENDPOINTS.CATEGORIES)
    .then(res => {
        if (!res.ok) {
            throw new Error('Failed to fetch categories');
        }
        return res.json();
    })
    .catch(error => {
        console.error('Error loading categories:', error);
        return [];
    });

const Categories = () => {
    const allCategories = use(categoryPromise);
    return (
        <div>
            <h1 className='font-bold text-lg'>All Categories ({allCategories.length})</h1>
            <div className='grid grid-cols-1 mt-2'>
                {
                    allCategories.map(category=> 
                        <NavLink
                        to={`/category/${category.id}`}
                        key={category.id}
                        className={"btn border-0 bg-base-100 hover:bg-base-300"}
                        >{category.name}</NavLink>
                    )
                }
            </div>

        </div>
    );
};

export default Categories;