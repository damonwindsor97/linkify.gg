import { io } from 'socket.io-client';

// CHANGE ADDRESS TO API LIVE SERVER 
export const socket = io('https://media-download-api.onrender.com/', {
    transports: ['websocket'],
    autoConnect: true,
    secure: true,
    upgrade: false
});