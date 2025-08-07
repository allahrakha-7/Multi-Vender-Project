import mongoose from "mongoose";

const messagesSchema = new mongoose.Schema({
    senderId: {
        type: String,
        required: true,
    }, 
    receiverId: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    images: {
        type: [String],
    },
    seen: {
        type: Boolean,
        default: false,
    },
    }, { timestamps: true }
);

const Messages = mongoose.model('Messages', messagesSchema);

export default Messages;

