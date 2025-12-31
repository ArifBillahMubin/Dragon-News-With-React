import { useState } from 'react';

// Custom hook for SweetAlert functionality
export const useSweetAlert = () => {
    const [alert, setAlert] = useState(null);

    const showAlert = (type, title, message, options = {}) => {
        setAlert({
            type,
            title,
            message,
            ...options
        });
    };

    const closeAlert = () => {
        setAlert(null);
    };

    // Convenience methods
    const showSuccess = (message, title = "Success!") => {
        showAlert('success', title, message);
    };

    const showError = (message, title = "Error!") => {
        showAlert('error', title, message);
    };

    const showWarning = (message, title = "Warning!") => {
        showAlert('warning', title, message);
    };

    const showInfo = (message, title = "Information") => {
        showAlert('info', title, message);
    };

    const showConfirm = (message, title = "Confirm", onConfirm, onCancel) => {
        showAlert('question', title, message, {
            showCancel: true,
            onConfirm: () => {
                closeAlert();
                if (onConfirm) onConfirm();
            },
            onCancel: () => {
                closeAlert();
                if (onCancel) onCancel();
            }
        });
    };

    return {
        alert,
        showAlert,
        closeAlert,
        showSuccess,
        showError,
        showWarning,
        showInfo,
        showConfirm
    };
};