require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const noteRoutes = require("./routes/noteRoutes");
const socketHandler = require("./socket/socket");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT"],
  },
});

app.use(cors());
app.use(express.json());
app.use("/api", noteRoutes);

socketHandler(io);

const port = process.env.PORT || 5000;

// DB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    server.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch((err) => console.log(err));
