import React from 'react';

// Custom SweetAlert-style notification component
const SweetAlert = ({ type, title, message, onClose, showCancel = false, onCancel, confirmText = "OK", cancelText = "Cancel" }) => {
    const icons = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️',
        question: '❓'
    };

    const colors = {
        success: 'bg-green-50 border-green-200',
        error: 'bg-red-50 border-red-200',
        warning: 'bg-yellow-50 border-yellow-200',
        info: 'bg-blue-50 border-blue-200',
        question: 'bg-gray-50 border-gray-200'
    };

    const textColors = {
        success: 'text-green-800',
        error: 'text-red-800',
        warning: 'text-yellow-800',
        info: 'text-blue-800',
        question: 'text-gray-800'
    };

    const buttonColors = {
        success: 'bg-green-600 hover:bg-green-700',
        error: 'bg-red-600 hover:bg-red-700',
        warning: 'bg-yellow-600 hover:bg-yellow-700',
        info: 'bg-blue-600 hover:bg-blue-700',
        question: 'bg-blue-600 hover:bg-blue-700'
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className={`max-w-md w-full mx-4 p-6 rounded-lg border-2 ${colors[type]} shadow-2xl transform transition-all duration-300 scale-100 animate-pulse`}>
                <div className="text-center">
                    <div className="text-4xl mb-4">{icons[type]}</div>
                    <h3 className={`text-xl font-bold mb-3 ${textColors[type]}`}>{title}</h3>
                    <div className={`text-sm mb-6 whitespace-pre-line ${textColors[type]}`}>{message}</div>
                    
                    <div className="flex gap-3 justify-center">
                        <button
                            onClick={onClose}
                            className={`px-6 py-2 text-white rounded-lg font-medium transition-colors ${buttonColors[type]}`}
                        >
                            {confirmText}
                        </button>
                        
                        {showCancel && (
                            <button
                                onClick={onCancel}
                                className="px-6 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg font-medium transition-colors"
                            >
                                {cancelText}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

// Confirmation dialog component
export const ConfirmAlert = ({ title, message, onConfirm, onCancel }) => {
    return (
        <SweetAlert
            type="question"
            title={title}
            message={message}
            onClose={onConfirm}
            onCancel={onCancel}
            showCancel={true}
            confirmText="Yes, Delete"
            cancelText="Cancel"
        />
    );
};

// Success notification component
export const SuccessAlert = ({ title = "Success!", message, onClose }) => {
    return (
        <SweetAlert
            type="success"
            title={title}
            message={message}
            onClose={onClose}
        />
    );
};

// Error notification component
export const ErrorAlert = ({ title = "Error!", message, onClose }) => {
    return (
        <SweetAlert
            type="error"
            title={title}
            message={message}
            onClose={onClose}
        />
    );
};

// Warning notification component
export const WarningAlert = ({ title = "Warning!", message, onClose }) => {
    return (
        <SweetAlert
            type="warning"
            title={title}
            message={message}
            onClose={onClose}
        />
    );
};

// Info notification component
export const InfoAlert = ({ title = "Information", message, onClose }) => {
    return (
        <SweetAlert
            type="info"
            title={title}
            message={message}
            onClose={onClose}
        />
    );
};

export default SweetAlert;