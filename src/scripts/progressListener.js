import { useEffect } from 'react';
import { socket } from './socket';

const useProgressSocket = (onProgress) => {
  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to socket server');
    });

    socket.on('progress', (data) => {
      console.log('Progress received:', data);
      onProgress(data);
    });

    return () => {
      socket.off('progress');
      socket.off('connect');
    };
  }, [onProgress]);
};

export default useProgressSocket;