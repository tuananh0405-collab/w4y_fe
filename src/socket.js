import { io } from "socket.io-client";
import { BASE_URL } from "./redux/constants";

export const socket = io(
  BASE_URL,
  //   , {
  //   path: "/socket.io",
  //   transports: ['websocket', 'polling']
  // }
);
