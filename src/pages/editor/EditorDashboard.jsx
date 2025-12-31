import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { FaEye, FaPlus, FaTrash } from 'react-icons/fa';
import { API_ENDPOINTS } from '../../config/api';

// Custom SweetAlert-style confirmation component
const ConfirmAlert = ({ title, message, onConfirm, onCancel }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="max-w-md w-full mx-4 p-6 bg-white rounded-lg shadow-2xl transform transition-all duration-300 scale-100">
                <div className="text-center">
                    <div className="text-4xl mb-4 text-red-500">⚠️</div>
                    <h3 className="text-xl font-bold mb-3 text-gray-800">{title}</h3>
                    <p className="text-gray-600 mb-6">{message}</p>
                    <div className="flex gap-3 justify-center">
                        <button
                            onClick={onConfirm}
                            className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
                        >
                            Yes, Delete
                        </button>
                        <button
                            onClick={onCancel}
                            className="px-6 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg font-medium transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Success notification component
const SuccessAlert = ({ message, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="max-w-md w-full mx-4 p-6 bg-green-50 border-2 border-green-200 rounded-lg shadow-2xl transform transition-all duration-300 scale-100">
                <div className="text-center">
                    <div className="text-4xl mb-4">✅</div>
                    <h3 className="text-xl font-bold mb-3 text-green-800">Success!</h3>
                    <p className="text-green-700 mb-6">{message}</p>
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
                    >
                        OK
                    </button>
                </div>
            </div>
        </div>
    );
};

const EditorDashboard = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [deleteConfirm, setDeleteConfirm] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        fetchNews();
        fetchCategories();
    }, []);

    const fetchNews = async () => {
        try {
            const response = await fetch(API_ENDPOINTS.NEWS);
            if (response.ok) {
                const data = await response.json();
                setNews(data);
            }
        } catch (error) {
            console.error('Error fetching news:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await fetch(API_ENDPOINTS.CATEGORIES);
            if (response.ok) {
                const data = await response.json();
                setCategories(data);
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleDeleteClick = (newsItem) => {
        setDeleteConfirm({
            id: newsItem.id || newsItem._id,
            title: newsItem.title
        });
    };

    const handleDeleteConfirm = async () => {
        if (!deleteConfirm) return;

        try {
            const response = await fetch(API_ENDPOINTS.DELETE_NEWS(deleteConfirm.id), {
                method: 'DELETE',
            });
            const result = await response.json();
            
            if (response.ok) {
                setNews(news.filter(item => 
                    (item.id || item._id) !== deleteConfirm.id
                ));
                setSuccessMessage('🗑️ News deleted successfully!');
            } else {
                alert(`Failed to delete news: ${result.error || 'Unknown error'}`);
            }
        } catch (error) {
            alert('Error deleting news: ' + error.message);
        } finally {
            setDeleteConfirm(null);
        }
    };

    const handleDeleteCancel = () => {
        setDeleteConfirm(null);
    };

    const closeSuccessAlert = () => {
        setSuccessMessage('');
    };

    const getCategoryName = (categoryId) => {
        const category = categories.find(cat => cat.id === categoryId);
        return category ? category.name : 'Unknown';
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="loading loading-spinner loading-lg"></div>
            </div>
        );
    }

    return (
        <>
            <div>
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">All News</h1>
                        <p className="text-sm text-gray-600 mt-1">Add new news and delete existing ones</p>
                    </div>
                    <Link 
                        to="/editor/add" 
                        className="btn btn-primary"
                    >
                        <FaPlus className="mr-2" />
                        Add New News
                    </Link>
                </div>

                <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Title
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Category
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Author
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Views
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Published
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {news.map((item) => (
                                    <tr key={item.id || item._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <img 
                                                    className="h-10 w-10 rounded object-cover mr-3" 
                                                    src={item.thumbnail_url} 
                                                    alt="" 
                                                />
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900 max-w-xs truncate">
                                                        {item.title}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                                {getCategoryName(item.category_id)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {item.author.name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {item.total_view}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(item.author.published_date).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex space-x-2">
                                                <Link
                                                    to={`/newsDetails/${item.id || item._id}`}
                                                    className="text-blue-600 hover:text-blue-900"
                                                    title="View News"
                                                >
                                                    <FaEye />
                                                </Link>
                                                <button
                                                    onClick={() => handleDeleteClick(item)}
                                                    className="text-red-600 hover:text-red-900"
                                                    title="Delete News"
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Alert */}
            {deleteConfirm && (
                <ConfirmAlert
                    title="Delete News"
                    message={`Are you sure you want to delete "${deleteConfirm.title}"? This action cannot be undone.`}
                    onConfirm={handleDeleteConfirm}
                    onCancel={handleDeleteCancel}
                />
            )}

            {/* Success Alert */}
            {successMessage && (
                <SuccessAlert
                    message={successMessage}
                    onClose={closeSuccessAlert}
                />
            )}
        </>
    );
};

export default EditorDashboard;