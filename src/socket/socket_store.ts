interface OnlineUser {
  socket_id: string;
  user_id: string;
}
// online users store
export var onlineUser: OnlineUser[] = [];

export function addOnlineUser(socket_id: string, user_id: string) {
  // add online user
  const exist = onlineUser.find((x) => x.user_id === user_id);
  if (!exist) onlineUser.push({ socket_id, user_id });
}

export function removeOnlineUser(socket_id: string) {
  // remove online
  onlineUser = onlineUser.filter((x) => x.socket_id !== socket_id);
}

export function getOnlineUser(socket_id: string) {
  // get online user
  return onlineUser.find((x) => x.socket_id === socket_id);
}
