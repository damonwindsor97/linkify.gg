import { useEffect } from 'react';
import { socket } from './socket';

const useProgressSocket = (onProgress) => {
    useEffect(() => {
    console.log('Attempting socket connection...');

    socket.on('connect', () => {
        console.log('[SOCKET] Connected! ID:', socket.id);
    });

    socket.on('connect_error', (err) => {
        console.error('[SOCKET] Connection error:', err.message);
    });

    socket.on('disconnect', (reason) => {
        console.warn('[SOCKET] Disconnected. Reason:', reason);
    });

    socket.on('progress', (data) => {
        console.log('[SOCKET] Progress event:', data);
        onProgress(data);
    });

    return () => {
        console.log('Cleaning up socket listeners');
        socket.off('connect');
        socket.off('connect_error');
        socket.off('disconnect');
        socket.off('progress');
    };
    }, [onProgress]);
};

export default useProgressSocket;