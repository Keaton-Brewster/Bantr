let clients = [];

module.exports = (io) => {
  // These functions are the event handlers for each client ("socket") that connects
  io.on("connection", (socket) => {
    console.log("client connected");
    // When the user initially logs into the app, they are going to register their socket
    // With their unique user._id so that we can keep track of "rooms", as you'll see
    socket.on("storeClientInfo", ({ userId }) => {
      var clientInfo = new Object();
      clientInfo.userId = userId;
      clientInfo.socketId = socket.id;
      clients.push(clientInfo);
    });

    // Rooms are joined on each persons "Post" page, as well as each comment section, when you open it
    socket.on("join room", ({ room }) => {
      socket.join(room);
    });

    // When posts unmount, or you close the comment modal, we want the socket to leave that "room"
    // So that you don't waste memory by recieveing updates to things that aren't on your screen
    socket.on("leave room", ({ room }) => {
      socket.leave(room);
    });

    // When the client disconnects, we want to remove them from our clients array, so that no weird client id duplications happen
    socket.on("disconnect", () => {
      clients = clients.filter((client) => client.socketId !== socket.id);
    });
  });
};
