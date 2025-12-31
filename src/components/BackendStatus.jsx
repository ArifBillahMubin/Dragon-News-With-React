import React, { useState, useEffect } from 'react';

const BackendStatus = () => {
    const [status, setStatus] = useState('checking');
    const [message, setMessage] = useState('Checking backend connection...');

    useEffect(() => {
        checkBackendStatus();
    }, []);

    const checkBackendStatus = async () => {
        try {
            const response = await fetch('http://localhost:3000/test');
            if (response.ok) {
                const data = await response.json();
                console.log('Backend response:', data);
                setStatus('connected');
                setMessage('Backend server is running');
            } else {
                setStatus('error');
                setMessage('Backend server responded with error');
            }
        } catch (error) {
            console.log('Error connecting to backend:', error);
            setStatus('disconnected');
            setMessage('Cannot connect to backend server');
        }
    };

    const getStatusColor = () => {
        switch (status) {
            case 'connected':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'disconnected':
                return 'bg-red-100 text-red-800 border-red-200';
            case 'error':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getStatusIcon = () => {
        switch (status) {
            case 'connected':
                return '✅';
            case 'disconnected':
                return '❌';
            case 'error':
                return '⚠️';
            default:
                return '🔄';
        }
    };

    return (
        <div className={`p-3 rounded-lg border text-sm ${getStatusColor()}`}>
            <div className="flex items-center gap-2">
                <span>{getStatusIcon()}</span>
                <span className="font-medium">{message}</span>
                <button 
                    onClick={checkBackendStatus}
                    className="ml-auto text-xs underline hover:no-underline"
                >
                    Refresh
                </button>
            </div>
            {status === 'disconnected' && (
                <div className="mt-2 text-xs">
                    <p>Make sure to run: <code className="bg-black text-white px-1 rounded">cd Dragon-news-server && node index.js</code></p>
                </div>
            )}
        </div>
    );
};

export default BackendStatus;