const Note = require("../models/Note");

function socketHandler(io) {
  const noteRooms = {};
  io.on("connection", (socket) => {
    socket.on("join_note", ({ noteId, userName }) => {
      socket.join(noteId);

      if (!noteRooms[noteId]) noteRooms[noteId] = new Map();
      noteRooms[noteId].set(socket.id, userName);

      const users = Array.from(noteRooms[noteId].values());
      io.to(noteId).emit("active_users", users);

      socket.on("disconnect", () => {
        noteRooms[noteId]?.delete(socket.id);
        const users = Array.from(noteRooms[noteId]?.values() || []);
        io.to(noteId).emit("active_users", users);
      });
    });

    socket.on("note_update", async ({ noteId, content }) => {
      socket.to(noteId).emit("note_update", content);
      await Note.findByIdAndUpdate(noteId, { content, updatedAt: new Date() });
    });
  });
}

module.exports = socketHandler;
