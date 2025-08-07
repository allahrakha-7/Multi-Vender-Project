import { useState, useEffect, useRef, useCallback } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaPaperPlane, FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";
import io from "socket.io-client";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";


const LiveChat = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const chatEndRef = useRef(null);
  const socket = useRef(null);

  const initializeSocket = useCallback(() => {
    socket.current = io("http://localhost:4000", {
      withCredentials: true,
      transports: ["websocket", "polling"], 
      reconnection: true, 
      reconnectionAttempts: 5,
      reconnectionDelay: 1000, 
    });

    socket.current.on("connect", () => {
      setIsConnected(true);
      toast.success("Connected to live chat!");
      if (currentUser?.username) {
        socket.current.emit("addUser", currentUser.username);
        socket.current.emit("loadInitialMessages", currentUser);
      }
    });

    socket.current.on("connect_error", (error) => {
      console.error("Connection error:", error.message, error);
      toast.error(`Failed to connect: ${error.message}. Check server status.`);
    });

    socket.current.on("disconnect", (reason) => {
      setIsConnected(false);
      console.log("Disconnected due to:", reason);
      toast.error(`Disconnected: ${reason}.`);
    });

    socket.current.on("getMessage", (message) => {
      setMessages((prev) => [...prev, message]);
      setIsTyping(false);
    });

    socket.current.on("initialMessages", (initialMessages) => {
      setMessages(initialMessages);
    });

    socket.current.on("typing", () => setIsTyping(true));
    socket.current.on("stopTyping", () => setIsTyping(false));

    return () => {
      if (socket.current && socket.current.connected) {
        socket.current.disconnect();
      }
    };
  }, [currentUser]);

  useEffect(() => {
    initializeSocket();
    return () => {
      if (socket.current && socket.current.connected) {
        socket.current.disconnect();
      }
    };
  }, [initializeSocket]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || isSending || !currentUser) return;

    setIsSending(true);
    try {
      const message = {
        senderId: currentUser.username || "Guest",
        receiverId: "support",
        text: newMessage,
      };
      socket.current.emit("sendMessage", message);
      setNewMessage("");
      setIsTyping(false);
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  const handleTyping = (e) => {
    setNewMessage(e.target.value);
    if (e.target.value.trim() && socket.current) {
      socket.current.emit("typing");
    } else if (socket.current) {
      socket.current.emit("stopTyping");
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  
    const navigate = useNavigate();
  
    const goBack = () => {
      navigate(-1);
    };

  return (
    <>
    <IoArrowBack
        onClick={goBack}
        className="text-2xl cursor-pointer absolute top-4 max-sm:top-2 max-sm:left-2 left-4 max-sm:text-xl font-semibold"
      />
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8" role="main">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900" aria-label="Live Chat">
            Live Chat
          </h1>
          <p className="mt-4 text-lg text-gray-600">Chat with our support team or chatbot</p>
        </div>

        <div className="mb-6 text-center" aria-live="polite">
          <p className={`text-sm ${isConnected ? "text-green-600" : "text-red-600"}`}>
            Status: {isConnected ? "Connected" : "Disconnected"}
          </p>
        </div>

        <section className="mb-6 bg-white p-6 rounded-lg shadow-md h-96 overflow-y-auto" aria-label="Chat History">
          {messages.length === 0 ? (
            <p className="text-center text-gray-600">No messages yet. Start chatting!</p>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message._id || message.id}
                  className={`p-3 rounded-lg max-w-[70%] ${message.senderId === (currentUser?.username || "Guest")
                    ? "bg-[#00bf63] text-white ml-auto"
                    : "bg-gray-200 text-gray-900"
                    }`}
                  role="log"
                >
                  <div className="flex justify-between items-baseline">
                    <span className="font-medium" aria-label={`${message.senderId} message`}>
                      {message.senderId === "chatbot" ? "Chatbot" : message.senderId === "support" ? "Support" : message.senderId}
                    </span>
                    <span className="text-xs text-gray-500" aria-hidden="true">
                      {message.timestamp}
                    </span>
                  </div>
                  <p className="mt-1" aria-live="polite">
                    {message.text}
                  </p>
                </div>
              ))}
              {isTyping && (
                <div className="p-3 rounded-lg bg-gray-200 text-gray-900 max-w-[70%]">
                  <p className="mt-1">Someone is typing...</p>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
          )}
        </section>

        {currentUser ? (
          <section className="bg-white p-6 rounded-lg shadow-md" aria-label="Chat Input">
            <form onSubmit={handleSendMessage} className="flex space-x-4" noValidate>
              <input
                type="text"
                value={newMessage}
                onChange={handleTyping}
                placeholder="Type your message..."
                className="flex-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00bf63] disabled:bg-gray-100"
                disabled={!isConnected || isSending}
                aria-label="Type your message"
                required
              />
              <button
                type="submit"
                className="bg-[#00bf63] text-white p-3 rounded-full hover:bg-green-700 transition flex items-center justify-center disabled:bg-gray-400 disabled:cursor-not-allowed"
                disabled={!isConnected || isSending || !newMessage.trim()}
                aria-label="Send message"
              >
                {isSending ? <FaSpinner className="animate-spin" /> : <FaPaperPlane />}
              </button>
            </form>
          </section>
        ) : (
          <p className="text-center text-gray-600 mb-12" role="alert">
            Please <Link to="/sign-in" className="text-[#00bf63] hover:underline">sign in</Link> to start a chat.
          </p>
        )}

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            For further assistance, contact us via email or phone.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-[#00bf63] text-white font-semibold px-6 py-3 rounded-full hover:bg-green-700 transition"
            aria-label="Contact Support"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
    </>
  );
};

export default LiveChat;