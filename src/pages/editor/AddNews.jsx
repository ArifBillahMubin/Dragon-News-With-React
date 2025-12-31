import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { API_ENDPOINTS } from '../../config/api';

// Custom SweetAlert-style notification component
const SweetAlert = ({ type, title, message, onClose }) => {
    const icons = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️'
    };

    const colors = {
        success: 'bg-green-50 border-green-200 text-green-800',
        error: 'bg-red-50 border-red-200 text-red-800',
        warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
        info: 'bg-blue-50 border-blue-200 text-blue-800'
    };

    const buttonColors = {
        success: 'bg-green-600 hover:bg-green-700',
        error: 'bg-red-600 hover:bg-red-700',
        warning: 'bg-yellow-600 hover:bg-yellow-700',
        info: 'bg-blue-600 hover:bg-blue-700'
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className={`max-w-md w-full mx-4 p-6 rounded-lg border-2 ${colors[type]} shadow-2xl transform transition-all duration-300 scale-100`}>
                <div className="text-center">
                    <div className="text-4xl mb-4">{icons[type]}</div>
                    <h3 className="text-xl font-bold mb-3">{title}</h3>
                    <div className="text-sm mb-6 whitespace-pre-line">{message}</div>
                    <button
                        onClick={onClose}
                        className={`px-6 py-2 text-white rounded-lg font-medium transition-colors ${buttonColors[type]}`}
                    >
                        OK
                    </button>
                </div>
            </div>
        </div>
    );
};

const AddNews = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [alert, setAlert] = useState(null);
    
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        defaultValues: {
            title: '',
            category_id: '',
            details: '',
            thumbnail_url: '',
            image_url: '',
            author_name: '',
            author_img: '',
            tags: '',
            rating: '4',
            is_today_pick: false,
            is_trending: false
        }
    });

    // Load categories on component mount
    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await fetch(API_ENDPOINTS.CATEGORIES);
            if (response.ok) {
                const data = await response.json();
                setCategories(data);
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
            showAlert('error', 'Error', 'Failed to load categories. Please refresh the page.');
        }
    };

    const showAlert = (type, title, message) => {
        setAlert({ type, title, message });
    };

    const closeAlert = () => {
        setAlert(null);
    };

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        
        try {
            console.log('Form data received:', data);
            
            // Prepare news data
            const newsData = {
                id: Date.now().toString() + Math.random().toString(36).substring(2, 11),
                title: data.title,
                category_id: parseInt(data.category_id),
                details: data.details,
                thumbnail_url: data.thumbnail_url,
                image_url: data.image_url,
                author: {
                    name: data.author_name,
                    img: data.author_img || 'https://randomuser.me/api/portraits/men/1.jpg',
                    published_date: new Date().toISOString()
                },
                tags: data.tags ? data.tags.split(',').map(tag => tag.trim()).filter(tag => tag) : [],
                rating: {
                    number: parseInt(data.rating),
                    badge: 'trending'
                },
                total_view: 0,
                others: {
                    is_today_pick: data.is_today_pick || false,
                    is_trending: data.is_trending || false
                },
                production: true
            };

            console.log('Sending to backend:', newsData);
            console.log('Required fields check:', {
                title: !!newsData.title,
                details: !!newsData.details,
                category_id: !!newsData.category_id
            });

            // Send to backend
            const response = await fetch(API_ENDPOINTS.CREATE_NEWS, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newsData),
            });

            const result = await response.json();
            console.log('Backend response:', result);

            if (response.ok) {
                // Show AI analysis result with SweetAlert
                if (result.aiAnalysis) {
                    const aiMessage = `🎉 News Added Successfully!\n\n🤖 AI Analysis:\n• Verdict: ${result.aiAnalysis.verdict}\n• Confidence: ${result.aiAnalysis.confidence}%\n• Reason: ${result.aiAnalysis.reason}`;
                    showAlert('success', 'Success!', aiMessage);
                } else {
                    showAlert('success', 'Success!', '🎉 News created successfully!');
                }
                reset();
                // Navigate after alert is closed
                setTimeout(() => {
                    navigate('/editor');
                }, 2000);
            } else {
                // Handle fake news rejection with detailed AI analysis
                if (response.status === 422 && result.aiAnalysis) {
                    const aiMessage = `🚫 News Rejected by AI!\n\nReason: ${result.error}\n\n🤖 AI Analysis:\n• Verdict: ${result.aiAnalysis.verdict}\n• Confidence: ${result.aiAnalysis.confidence}%\n• Fake Score: ${result.aiAnalysis.fakeScore}%\n• Real Score: ${result.aiAnalysis.realScore}%\n\n📝 Please review your content and try again.`;
                    showAlert('error', 'Content Rejected', aiMessage);
                } else {
                    showAlert('error', 'Error', `❌ Failed to create news:\n${result.error || 'Unknown error'}`);
                }
            }
        } catch (error) {
            console.error('Error creating news:', error);
            showAlert('error', 'Network Error', `❌ Error creating news:\n${error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <div className="max-w-4xl mx-auto">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">Add New News</h1>
                    <p className="text-gray-600 mt-2">Create a new news article with AI-powered content verification</p>
                </div>

                <div className="bg-white shadow-lg rounded-lg p-8">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        
                        {/* Title */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                News Title *
                            </label>
                            <input
                                type="text"
                                {...register('title', { 
                                    required: 'Title is required',
                                    minLength: { value: 10, message: 'Title must be at least 10 characters' }
                                })}
                                className="input input-bordered w-full"
                                placeholder="Enter news title"
                            />
                            {errors.title && (
                                <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                            )}
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Category *
                            </label>
                            <select
                                {...register('category_id', { required: 'Category is required' })}
                                className="select select-bordered w-full"
                            >
                                <option value="">Select Category</option>
                                {categories.map(category => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                            {errors.category_id && (
                                <p className="text-red-500 text-sm mt-1">{errors.category_id.message}</p>
                            )}
                        </div>

                        {/* Author Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Author Name *
                            </label>
                            <input
                                type="text"
                                {...register('author_name', { required: 'Author name is required' })}
                                className="input input-bordered w-full"
                                placeholder="Enter author name"
                            />
                            {errors.author_name && (
                                <p className="text-red-500 text-sm mt-1">{errors.author_name.message}</p>
                            )}
                        </div>

                        {/* Author Image URL */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Author Image URL (optional)
                            </label>
                            <input
                                type="url"
                                {...register('author_img')}
                                className="input input-bordered w-full"
                                placeholder="https://example.com/author.jpg"
                            />
                        </div>

                        {/* Thumbnail URL */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Thumbnail Image URL *
                            </label>
                            <input
                                type="url"
                                {...register('thumbnail_url', { 
                                    required: 'Thumbnail URL is required',
                                    pattern: {
                                        value: /^https?:\/\/.+/,
                                        message: 'Please enter a valid URL'
                                    }
                                })}
                                className="input input-bordered w-full"
                                placeholder="https://example.com/thumbnail.jpg"
                            />
                            {errors.thumbnail_url && (
                                <p className="text-red-500 text-sm mt-1">{errors.thumbnail_url.message}</p>
                            )}
                        </div>

                        {/* Main Image URL */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Main Image URL *
                            </label>
                            <input
                                type="url"
                                {...register('image_url', { 
                                    required: 'Main image URL is required',
                                    pattern: {
                                        value: /^https?:\/\/.+/,
                                        message: 'Please enter a valid URL'
                                    }
                                })}
                                className="input input-bordered w-full"
                                placeholder="https://example.com/main-image.jpg"
                            />
                            {errors.image_url && (
                                <p className="text-red-500 text-sm mt-1">{errors.image_url.message}</p>
                            )}
                        </div>

                        {/* News Details */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                News Details *
                            </label>
                            <textarea
                                {...register('details', { 
                                    required: 'News details are required',
                                    minLength: { value: 50, message: 'Details must be at least 50 characters' }
                                })}
                                rows={6}
                                className="textarea textarea-bordered w-full"
                                placeholder="Enter detailed news content..."
                            />
                            {errors.details && (
                                <p className="text-red-500 text-sm mt-1">{errors.details.message}</p>
                            )}
                        </div>

                        {/* Tags */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Tags (comma separated)
                            </label>
                            <input
                                type="text"
                                {...register('tags')}
                                className="input input-bordered w-full"
                                placeholder="technology, breaking news, politics"
                            />
                            <p className="text-gray-500 text-sm mt-1">Separate tags with commas</p>
                        </div>

                        {/* Rating */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Rating (1-5)
                            </label>
                            <select
                                {...register('rating')}
                                className="select select-bordered w-full"
                            >
                                <option value="1">1 Star</option>
                                <option value="2">2 Stars</option>
                                <option value="3">3 Stars</option>
                                <option value="4">4 Stars</option>
                                <option value="5">5 Stars</option>
                            </select>
                        </div>

                        {/* Special Options */}
                        <div className="flex flex-wrap gap-6">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    {...register('is_today_pick')}
                                    className="checkbox checkbox-primary mr-2"
                                />
                                <span className="text-sm font-medium text-gray-700">Today's Pick</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    {...register('is_trending')}
                                    className="checkbox checkbox-primary mr-2"
                                />
                                <span className="text-sm font-medium text-gray-700">Trending News</span>
                            </label>
                        </div>

                        {/* Submit Buttons */}
                        <div className="flex gap-4 pt-6 border-t">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="btn btn-primary px-8"
                            >
                                {isSubmitting ? (
                                    <>
                                        <span className="loading loading-spinner loading-sm mr-2"></span>
                                        🤖 AI Analyzing...
                                    </>
                                ) : (
                                    '🚀 Create News'
                                )}
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate('/editor')}
                                className="btn btn-outline px-8"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={() => reset()}
                                className="btn btn-ghost px-8"
                            >
                                Reset Form
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Custom SweetAlert-style notification */}
            {alert && (
                <SweetAlert
                    type={alert.type}
                    title={alert.title}
                    message={alert.message}
                    onClose={closeAlert}
                />
            )}
        </>
    );
};

export default AddNews;