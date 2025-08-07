import Messages from "../model/messages.model.js";
import { getUser } from "../controllers/user.controller.js";

export const sendMessage = async (io, socket, { senderId, receiverId, text, images }) => {
  try {
    const message = new Messages({
      senderId,
      receiverId,
      text,
      images,
      seen: false,
      timestamp: new Date(),
    });
    await message.save();

    const user = await getUser(receiverId);
    if (user?.socketId) {
      io.to(user.socketId).emit("getMessage", message);
      console.log(`💬 Message sent from ${senderId} to ${receiverId}`);
    } else {
      console.log(`⚠️ User ${receiverId} not found or not connected`);
    }
  } catch (error) {
    console.error("Error sending message:", error);
    // Optionally emit an error to the client
    socket.emit("messageError", { error: "Failed to send message" });
  }
};

// Other functions (loadInitialMessages, markMessageAsSeen) remain similar

// Controller function to handle initial message load on connection
export const loadInitialMessages = async (io, socket, currentUser) => {
  try {
    if (currentUser?.username) {
      const userMessages = await Messages.find({ receiverId: currentUser.username }).sort({ timestamp: -1 });
      socket.emit("initialMessages", userMessages);
      console.log(`📥 Initial messages loaded for ${currentUser.username}`);
    }
  } catch (error) {
    console.error("Error loading initial messages:", error);
  }
};

// Controller function to handle message seen status
export const markMessageAsSeen = async (io, socket, { senderId, receiverId, messageId }) => {
  try {
    const user = getUser(senderId);
    if (user?.socketId) {
      const message = await Messages.findOne({ _id: messageId, receiverId, seen: false });
      if (message) {
        message.seen = true;
        await message.save();
        io.to(user.socketId).emit("messageSeen", { senderId, receiverId, messageId });
        console.log(`👁️ Message ${messageId} marked as seen by ${senderId}`);
      }
    }
  } catch (error) {
    console.error("Error marking message as seen:", error);
  }
};