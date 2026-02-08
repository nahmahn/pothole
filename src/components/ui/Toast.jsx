import React, { createContext, useContext, useState, useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = (message, type = 'info', duration = 3000) => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type, duration }]);
    };

    const removeToast = (id) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    };

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            <div className="toast-container">
                {toasts.map(toast => (
                    <div key={toast.id} className={`toast toast-${toast.type}`}>
                        <div className="toast-content">
                            {toast.type === 'success' && <CheckCircle size={18} />}
                            {toast.type === 'error' && <AlertCircle size={18} />}
                            {toast.type === 'info' && <Info size={18} />}
                            <span>{toast.message}</span>
                        </div>
                        <button onClick={() => removeToast(toast.id)} className="toast-close">
                            <X size={14} />
                        </button>
                        <TimeoutHandler id={toast.id} duration={toast.duration} onRemove={removeToast} />
                    </div>
                ))}
            </div>
            <style>{`
                .toast-container {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    z-index: 9999;
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }
                .toast {
                    min-width: 300px;
                    padding: 15px;
                    border-radius: 4px;
                    background: white;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    animation: slideIn 0.3s ease-out;
                    border-left: 5px solid #1d70b8;
                    color: #0b0c0c;
                }
                .toast-success { border-left-color: #00703c; }
                .toast-error { border-left-color: #d4351c; }
                .toast-content {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    font-weight: 500;
                    font-size: 14px;
                }
                .toast-close {
                    background: none;
                    border: none;
                    cursor: pointer;
                    color: #505a5f;
                    padding: 0;
                    margin-left: 10px;
                }
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
            `}</style>
        </ToastContext.Provider>
    );
};

// Helper component to handle timeout inside the map loop safely
const TimeoutHandler = ({ id, duration, onRemove }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onRemove(id);
        }, duration);
        return () => clearTimeout(timer);
    }, [id, duration, onRemove]);
    return null;
};
