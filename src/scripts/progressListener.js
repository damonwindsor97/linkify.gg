import { useEffect } from 'react';
import { socket } from './socket';

const useProgressSocket = (onProgress) => {
  useEffect(() => {
    console.log('Attempting socket connection...');

    socket.on('connect', () => {
      console.log('Socket connected:', socket.id);
    });

    socket.on('progress', (data) => {
      console.log('Progress update:', data);
      onProgress(data);
    });

    return () => {
      socket.off('progress');
      socket.off('connect');
    };
  }, [onProgress]);
};

export default useProgressSocket;