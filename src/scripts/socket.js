import { io } from 'socket.io-client';

// CHANGE ADDRESS TO API LIVE SERVER 
export const socket = io('https://dev-media-download-api.onrender.com', {
    transports: ['websocket'],
});