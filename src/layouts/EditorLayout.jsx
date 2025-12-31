import React from 'react';
import { Outlet, NavLink } from 'react-router';
import { FaHome, FaPlus, FaList, FaSignOutAlt } from 'react-icons/fa';

const EditorLayout = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <h1 className="text-xl font-bold text-gray-900">Editor Dashboard</h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <NavLink 
                                to="/" 
                                className="text-gray-600 hover:text-gray-900 flex items-center gap-2"
                            >
                                <FaHome /> Back to Site
                            </NavLink>
                            <button className="text-red-600 hover:text-red-800 flex items-center gap-2">
                                <FaSignOutAlt /> Logout
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="flex">
                {/* Sidebar */}
                <aside className="w-64 bg-white shadow-sm min-h-screen">
                    <nav className="mt-8">
                        <div className="px-4 space-y-2">
                            <NavLink
                                to="/editor"
                                end
                                className={({ isActive }) =>
                                    `flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                                        isActive
                                            ? 'bg-blue-100 text-blue-700'
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    }`
                                }
                            >
                                <FaList className="mr-3" />
                                All News
                            </NavLink>
                            <NavLink
                                to="/editor/add"
                                className={({ isActive }) =>
                                    `flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                                        isActive
                                            ? 'bg-blue-100 text-blue-700'
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    }`
                                }
                            >
                                <FaPlus className="mr-3" />
                                Add New News
                            </NavLink>
                        </div>
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default EditorLayout;