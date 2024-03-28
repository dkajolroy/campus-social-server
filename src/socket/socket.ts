import { Server } from "socket.io";
import { addOnlineUser, onlineUser, removeOnlineUser } from "./socket_store";

export function socketInit(io: Server) {
  io.on("connection", (socket) => {
    // add online users
    socket.on("add_online_user", async (userId) => {
      addOnlineUser(socket.id, userId);

      // send online friends
      io.emit("online_users", onlineUser);
    });
    // Join all rooms
    socket.on("join_room", (conversationId) => {
      socket.join(conversationId);
    });
    // });
    socket.on("disconnect", () => {
      removeOnlineUser(socket.id);
      // send online friends
      io.emit("online_users", onlineUser);
      // console.log("disconnected");
    });
  });
}
