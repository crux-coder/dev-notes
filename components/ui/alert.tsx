import React from 'react';
import { InfoIcon, CircleCheck, CircleX, TriangleAlert } from 'lucide-react'; // Assume these icons are imported from your icons file

interface AlertProps {
    message: string;
    type?: 'success' | 'error' | 'warning' | 'info';
}

const Alert: React.FC<AlertProps> = ({ message, type = 'info' }) => {
    const getAlertClass = () => {
        switch (type) {
            case 'success':
                return 'bg-green-100 text-green-800';
            case 'error':
                return 'bg-red-100 text-red-800';
            case 'warning':
                return 'bg-yellow-100 text-yellow-800';
            default:
                return 'bg-blue-100 text-blue-800';
        }
    };

    const getIcon = () => {
        switch (type) {
            case 'success':
                return <CircleCheck size="16" strokeWidth={2} />;
            case 'error':
                return <CircleX size="16" strokeWidth={2} />;
            case 'warning':
                return <TriangleAlert size="16" strokeWidth={2} />;
            default:
                return <InfoIcon size="16" strokeWidth={2} />;
        }
    };

    return (
        <div className={`p-3 px-5 rounded-md flex gap-3 items-center ${getAlertClass()}`}>
            {getIcon()}
            {message}
        </div>
    );
};

export default Alert;