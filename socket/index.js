import { Server as socketIO } from "socket.io";
import http from 'http';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config({ path: "./.env" });

const app = express();
const server = http.createServer(app);
const io = new socketIO(server);

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome from socket server!");
});

let users = [];

const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) && users.push({ userId, socketId });
};

const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (receiverId) => {
    return users.find((user) => user.userId === receiverId);
};

const createMessage = ({ senderId, receiverId, text, images }) => ({
    senderId,
    receiverId,
    text,
    images,
    seen: false,
});

const messages = {};

io.on("connection", (socket) => {
    console.log(`a user is connected`);

    socket.on("addUser", (userId) => {
        addUser(userId, socket.id);
        io.emit("getUsers", users);
    });

    socket.on("sendMessage", ({ senderId, receiverId, text, images }) => {
        const message = createMessage({ senderId, receiverId, text, images });

        const user = getUser(receiverId);

        if (!messages[receiverId]) {
            messages[receiverId] = [message];
        } else {
            messages[receiverId].push(message);
        }

        io.to(user?.socketId).emit("getMessage", message);
    });

    socket.on("messageSeen", ({ senderId, receiverId, messageId }) => {
        const user = getUser(senderId);

        if (messages[senderId]) {
            const message = messages[senderId].find(
                (message) =>
                    message.receiverId === receiverId && message.id === messageId);
            if (message) {
                message.seen = true;

                io.to(user?.socketId).emit("messageSeen", { senderId, receiverId, messageId });
            }
        }
    });

    socket.on("updateLastMessage", ({ lastMessage, lastMessagesId }) => {
        io.emit("getLastMessage", {
            lastMessage,
            lastMessagesId,
        });
    });

    socket.on("disconnect", () => {
        console.log(`a user disconnected!`);
        removeUser(socket.id);
        io.emit("getUsers", users);
    });
});

server.listen(process.env.PORT || 4000, () => {
    console.log(`server is running on port ${process.env.PORT || 4000}`);
});