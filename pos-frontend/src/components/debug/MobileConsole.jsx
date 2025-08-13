import React, { useState, useEffect } from 'react';

const MobileConsole = () => {
    const [logs, setLogs] = useState([]);
    const [isVisible, setIsVisible] = useState(true);
    const [isMinimized, setIsMinimized] = useState(false);

    useEffect(() => {
        // Override console methods to capture logs
        const originalLog = console.log;
        const originalError = console.error;
        const originalWarn = console.warn;
        const originalInfo = console.info;

        const addLog = (type, args) => {
            const timestamp = new Date().toLocaleTimeString();
            const message = args.map(arg => 
                typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
            ).join(' ');
            
            setLogs(prev => [...prev.slice(-49), { type, message, timestamp }]);
        };

        console.log = (...args) => {
            originalLog(...args);
            addLog('log', args);
        };

        console.error = (...args) => {
            originalError(...args);
            addLog('error', args);
        };

        console.warn = (...args) => {
            originalWarn(...args);
            addLog('warn', args);
        };

        console.info = (...args) => {
            originalInfo(...args);
            addLog('info', args);
        };

        // Cleanup
        return () => {
            console.log = originalLog;
            console.error = originalError;
            console.warn = originalWarn;
            console.info = originalInfo;
        };
    }, []);

    const clearLogs = () => setLogs([]);

    const getLogColor = (type) => {
        switch (type) {
            case 'error': return 'text-red-500';
            case 'warn': return 'text-yellow-500';
            case 'info': return 'text-blue-500';
            default: return 'text-green-500';
        }
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-4 right-4 bg-black bg-opacity-90 text-white rounded-lg shadow-lg z-50 max-w-sm">
            {/* Header */}
            <div className="flex items-center justify-between p-2 border-b border-gray-600">
                <span className="text-sm font-bold">📱 Mobile Console</span>
                <div className="flex space-x-2">
                    <button
                        onClick={() => setIsMinimized(!isMinimized)}
                        className="px-2 py-1 bg-gray-600 rounded text-xs"
                    >
                        {isMinimized ? '📖' : '📚'}
                    </button>
                    <button
                        onClick={clearLogs}
                        className="px-2 py-1 bg-red-600 rounded text-xs"
                    >
                        🗑️
                    </button>
                    <button
                        onClick={() => setIsVisible(false)}
                        className="px-2 py-1 bg-gray-600 rounded text-xs"
                    >
                        ✕
                    </button>
                </div>
            </div>

            {/* Logs */}
            {!isMinimized && (
                <div className="max-h-64 overflow-y-auto p-2">
                    {logs.length === 0 ? (
                        <div className="text-gray-400 text-xs text-center py-4">
                            No logs yet...
                        </div>
                    ) : (
                        logs.map((log, index) => (
                            <div key={index} className="mb-1 text-xs">
                                <span className="text-gray-400 text-xs">
                                    {log.timestamp}
                                </span>
                                <span className={`ml-2 ${getLogColor(log.type)}`}>
                                    {log.message}
                                </span>
                            </div>
                        ))
                    )}
                </div>
            )}

            {/* Status Bar */}
            <div className="p-2 border-t border-gray-600 text-xs text-gray-400">
                {logs.length} logs | {isMinimized ? 'Minimized' : 'Expanded'}
            </div>
        </div>
    );
};

export default MobileConsole; 