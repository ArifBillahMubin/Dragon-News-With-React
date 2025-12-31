import { createBrowserRouter } from "react-router";
import HomeLayout from "../layouts/HomeLayout";
import Home from "../pages/Home";
import CategoryNews from "../pages/CategoryNews";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AuthLayout from "../layouts/AuthLayout";
import NewsDetails from "../pages/NewsDetails";
import PrivateRoute from "../provider/privateRoute";
import EditorLayout from "../layouts/EditorLayout";
import EditorDashboard from "../pages/editor/EditorDashboard";
import AddNews from "../pages/editor/AddNews";
import { API_ENDPOINTS } from "../config/api";

export const router = createBrowserRouter([
    {
        path: '/',
        Component: HomeLayout,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: '/category/:id',
                Component: CategoryNews,
                loader: async () => {
                    try {
                        const response = await fetch(API_ENDPOINTS.NEWS);
                        if (!response.ok) {
                            throw new Error('Failed to fetch news');
                        }
                        return response.json();
                    } catch (error) {
                        console.error('Error loading news:', error);
                        return [];
                    }
                },
                hydrateFallbackElement: <p>Loading.......</p>
            }
        ]
    },
    {
        path: "/auth",
        Component: AuthLayout,
        children: [
            {
                path: "/auth/login",
                Component: Login
            },
            {
                path: "/auth/register",
                Component: Register
            }

        ]
    },
    {
        path: '/newsDetails/:id',
        loader: async () => {
            try {
                const response = await fetch(API_ENDPOINTS.NEWS);
                if (!response.ok) {
                    throw new Error('Failed to fetch news');
                }
                return response.json();
            } catch (error) {
                console.error('Error loading news:', error);
                return [];
            }
        },
        element: <PrivateRoute><NewsDetails></NewsDetails></PrivateRoute>,
        hydrateFallbackElement: <p>Loading.......</p>
    },
    {
        path: '/editor',
        Component: EditorLayout,
        children: [
            {
                index: true,
                Component: EditorDashboard
            },
            {
                path: 'add',
                Component: AddNews
            }
        ]
    }

])