import { createBrowserRouter } from "react-router";
import HomeLayout from "../layouts/HomeLayout";
import Home from "../pages/Home";
import CategoryNews from "../pages/CategoryNews";

export const router = createBrowserRouter([
    {
        path: '/',
        Component: HomeLayout,
        children:[
            {
                index:true,
                Component:Home
            },
            {
                path:'/category/:id',
                Component:CategoryNews,
                loader:()=> fetch('/news.json')
            }
        ]
    }
])