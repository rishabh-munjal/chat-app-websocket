import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

interface User {
  socket: WebSocket;
  room: string;
}

let allSockets: User[] = [];

wss.on("connection", (socket) => {
  console.log("New connection established");

  socket.on("message", (message) => {
    let parsedMsg: any;

    try {
      parsedMsg = JSON.parse(message.toString());
    } catch (err) {
      console.error("Invalid JSON received");
      return;
    }

    // JOIN event
    if (parsedMsg.type === "join") {
      const roomId = parsedMsg.payload.roomId;
      console.log(`Join request for room: ${roomId}`);

      // Remove previous instances
      allSockets = allSockets.filter(user => user.socket !== socket);

      // Add new user to room
      allSockets.push({ socket, room: roomId });
      console.log(`User joined room: ${roomId}`);
    }

    // CHAT event
    if (parsedMsg.type === "chat") {
      const sender = allSockets.find(user => user.socket === socket);
      if (!sender) {
        console.log("Sender not found in room list");
        return;
      }

      const senderRoom = sender.room;
      const messageToSend = parsedMsg.payload.message;

      const targets = allSockets.filter(
        user => user.room === senderRoom && user.socket !== socket
      );

      console.log(`Broadcasting message to ${targets.length} other users in room: ${senderRoom}`);

      targets.forEach(user => {
        user.socket.send(messageToSend);
      });
    }
  });

  socket.on("close", () => {
    allSockets = allSockets.filter(user => user.socket !== socket);
    console.log("Socket disconnected and removed");
  });
});
