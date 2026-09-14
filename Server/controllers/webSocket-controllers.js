const initializeSocket = (io) => {
  io.on("connection", (socket) => {

      //  Join Room (User-Specific)
      socket.on("join", (userId) => {
          socket.join(userId);
      });

      //  Handle Sending Messages
      socket.on("sendMessage", (data) => {
          const { senderId, receiverId, message } = data;
          const conversationId = [senderId, receiverId].sort().join("_");

          // Broadcast message to receiver's room
          io.to(receiverId).emit("messageReceived", { senderId, message, conversationId });

      });
  });
};

module.exports = initializeSocket;
