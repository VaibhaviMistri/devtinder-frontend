import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { createSocketConnection, disconnectSocket } from "../utils/socket";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [oppositeUserInfo, setOppositeUserInfo] = useState({
    firstName: null,
    lastName: null,
    photoUrl: null
  });
  const loggedInUser = useSelector((store) => store.user);
  const loggedInUserId = loggedInUser?._id;

  const navigate = useNavigate();
  const socketRef = useRef(null);

  const fetchOppositeUserInfo = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/" + targetUserId, {
        withCredentials: true
      });
      const { firstName, lastName, photoUrl } = res.data;
      setOppositeUserInfo({ firstName, lastName, photoUrl });
      
      
    } catch (error) {
      console.error(error);      
    }
  }

  const fetchChat = async () => {
    const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
      withCredentials: true
    });


    const chatMessages = chat?.data?.messages.map((msg) => {
      const { senderId, text } = msg;
      return {
        _id: senderId?._id,
        firstName: senderId?.firstName,
        lastName: senderId?.lastName,
        photoUrl: senderId?.photoUrl,
        text,
      };
    });
    setMessages(chatMessages.reverse());
  }

  useEffect(() => {
    fetchOppositeUserInfo();
    fetchChat();
  }, []);

  useEffect(() => {
    if (!loggedInUserId || !targetUserId) {
      return;
    }
    const socket = createSocketConnection();
    socketRef.current = socket;

    socket.emit("joinChat", { targetUserId });

    socket.on("chatAccessDenied", ({ message }) => {
      alert(message);
      navigate("/connections")
    });

    socket.on("messageReceived", ({ _id, firstName, lastName, photoUrl, text }) => {
      setMessages((prevMessages) => [{ _id, firstName, lastName, photoUrl, text }, ...prevMessages]);
    });

    return () => {
      disconnectSocket();
    };
  }, [loggedInUserId, targetUserId]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    if (!socketRef.current) return;

    socketRef.current.emit("sendMessage", {
      targetUserId,
      text: newMessage
    });
    setNewMessage("");
  };

  return (
    <div className="w-1/2 mx-auto border border-gray-500 m-5 h-[80vh] flex flex-col">
      <div className="p-3 border-b border-gray-600 font-bold flex items-center gap-3">
        <div className="avatar">
          <div className="w-20 rounded-full">
            <img src={oppositeUserInfo.photoUrl} />
          </div>
        </div>
        <h1 className="text-lg">
          {`${oppositeUserInfo.firstName} ${oppositeUserInfo.lastName}`}
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto p-5 flex flex-col-reverse">
        {messages.map((msg, index) => (
          <div key={index} className={msg._id === loggedInUserId ? "chat chat-end" : "chat chat-start"}>
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img alt="Profile" src={msg.photoUrl} />
              </div>
            </div>
            <div className="chat-header">
              {`${msg.firstName} ${msg.lastName}`}
              <time className="text-xs opacity-50">{/* optional timestamp */}</time>
            </div>
            <div className="chat-bubble">{msg.text}</div>
          </div>
        ))}
      </div>

      <div className="p-5 border-t border-gray-500 flex justify-between gap-2">
        <input className="h-25 w-[70vw] border border-gray-300 rounded p-2" type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat