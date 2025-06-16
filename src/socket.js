import { io } from "socket.io-client";

const API_URL = "http://localhost:3000"; // TODO: get this from env

export const socket = io(API_URL
//   , {
//   path: "/socket.io",
//   transports: ['websocket', 'polling']
// }
);
