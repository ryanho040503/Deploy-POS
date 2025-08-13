import React, { useState, useEffect } from 'react';
import { getErrorLogs, clearErrorLogs } from '../../utils/debugUtils';

const ErrorLogs = () => {
    const [errorLogs, setErrorLogs] = useState([]);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const logs = getErrorLogs();
        setErrorLogs(logs);
    }, []);

    const handleClearLogs = () => {
        clearErrorLogs();
        setErrorLogs([]);
    };

    const handleRefresh = () => {
        const logs = getErrorLogs();
        setErrorLogs(logs);
    };

    if (!isVisible) {
        return (
            <button
                onClick={() => setIsVisible(true)}
                className="fixed bottom-4 right-4 bg-red-500 text-white p-2 rounded-full z-50"
                title="Show Error Logs"
            >
                🐛
            </button>
        );
    }

    return (
        <div className="fixed bottom-4 right-4 bg-black text-white p-4 rounded-lg z-50 max-w-md max-h-96 overflow-auto">
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-bold">Error Logs ({errorLogs.length})</h3>
                <div className="flex gap-2">
                    <button
                        onClick={handleRefresh}
                        className="text-xs bg-blue-500 px-2 py-1 rounded"
                    >
                        🔄
                    </button>
                    <button
                        onClick={handleClearLogs}
                        className="text-xs bg-red-500 px-2 py-1 rounded"
                    >
                        🗑️
                    </button>
                    <button
                        onClick={() => setIsVisible(false)}
                        className="text-xs bg-gray-500 px-2 py-1 rounded"
                    >
                        ✕
                    </button>
                </div>
            </div>
            
            {errorLogs.length === 0 ? (
                <p className="text-xs text-gray-400">No errors logged</p>
            ) : (
                <div className="space-y-2">
                    {errorLogs.map((log, index) => (
                        <div key={index} className="text-xs border border-gray-600 p-2 rounded">
                            <div className="font-bold text-red-400">{log.context}</div>
                            <div className="text-gray-300">{log.message}</div>
                            <div className="text-gray-500 text-xs">
                                {new Date(log.timestamp).toLocaleString()}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ErrorLogs; 