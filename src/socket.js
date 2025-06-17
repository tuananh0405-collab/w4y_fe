import { io } from "socket.io-client";
import { BASE_URL } from "./redux/constants";

export const socket = io(import.meta.env.VITE_SOCKET_BASE_URL ?? BASE_URL, {
  path: (import.meta.env.VITE_SOCKET_PATH ?? "") + "/socket.io",
  // transports: ['websocket', 'polling']
});
