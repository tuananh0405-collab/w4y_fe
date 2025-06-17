import { io } from "socket.io-client";
import { BASE_URL } from "./redux/constants";

export const socket = io(BASE_URL, {
  path: (import.meta.env.VITE_SOCKET_PATH ?? "") + "/socket.io",
  // transports: ['websocket', 'polling']
});
