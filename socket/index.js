// socket/index.js
import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { sendMessage, loadInitialMessages, markMessageAsSeen } from "../backend/controllers/messages.controller.js";

dotenv.config({ path: "./.env" });

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:5173", "http://localhost:8000"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:5173", "http://localhost:8000"],
  credentials: true,
}));
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO).then(() => {
  console.log("MongoDB connected successfully");
}).catch((err) => {
  console.error("MongoDB connection error:", err);
});

app.get("/", (req, res) => {
  res.send("Welcome from socket server!");
});

// Store connected users
let users = [];

const addUser = (userId, socketId) => {
  if (!users.some((user) => user.userId === userId)) {
    users.push({ userId, socketId });
    io.emit("getUsers", users);
    console.log(`👤 User added: ${userId} with socketId ${socketId}`);
  }
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
  io.emit("getUsers", users);
  console.log(`👤 User removed: ${socketId}`);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

// Simple chatbot logic
const chatbotResponses = {
  "hello": "Hi there! How can I assist you today?",
  "help": "Sure, I'm here to help! What do you need assistance with?",
  "bye": "Goodbye! Feel free to return if you need more help.",
  "default": "I'm not sure how to respond to that. Try 'help' or 'hello'!",
};

const handleChatbot = (messageText, senderId) => {
  const lowerCaseText = messageText.toLowerCase();
  for (const [intent, response] of Object.entries(chatbotResponses)) {
    if (lowerCaseText.includes(intent)) {
      return {
        senderId: "chatbot",
        receiverId: senderId,
        text: response,
        timestamp: new Date().toLocaleTimeString(),
      };
    }
  }
  return {
    senderId: "chatbot",
    receiverId: senderId,
    text: chatbotResponses.default,
    timestamp: new Date().toLocaleTimeString(),
  };
};

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id} from ${socket.handshake.address}`);

  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
  });

  socket.on("sendMessage", (data) => {
    sendMessage(io, socket, data, users); // Send user message
    // Trigger chatbot response
    const chatbotMessage = handleChatbot(data.text, data.senderId);
    sendMessage(io, socket, chatbotMessage, users); // Send chatbot reply
  });

  socket.on("loadInitialMessages", (currentUser) => {
    loadInitialMessages(io, socket, currentUser);
  });

  socket.on("messageSeen", (data) => {
    markMessageAsSeen(io, socket, data);
  });

  socket.on("typing", () => {
    socket.broadcast.emit("typing");
    console.log(`${socket.id} is typing`);
  });

  socket.on("stopTyping", () => {
    socket.broadcast.emit("stopTyping");
    console.log(`${socket.id} stopped typing`);
  });

  socket.on("message", (message) => {
    console.log(`Received message:`, message);
    const supportMessage = {
      senderId: "support",
      receiverId: message.senderId,
      text: "Thank you for your message! We'll get back to you soon.",
      timestamp: new Date().toLocaleTimeString(),
    };
    sendMessage(io, socket, supportMessage, users);
  });

  socket.on("disconnect", (reason) => {
    console.log(`User disconnected: ${socket.id}, Reason: ${reason}`);
    removeUser(socket.id);
  });
});

server.listen(4000, () => {
  console.log(`Socket server running on port 4000!`);
});