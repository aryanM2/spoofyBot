import React, { useEffect, useRef, useState } from "react";
import { MdOutlineAccountCircle } from "react-icons/md";
import axios from "axios";
import "./chatbot.css";

function Chatbot() {
  const [message, setMessage] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messageEndRef = useRef(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message, loading]);

  const handleFunction = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessage((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post(
        "https://spoofybotserver.onrender.com/bot/v1/message",
        {
          text: input,
        }
      );
      if (res.status === 200) {
        const botMessage = { text: res.data.botMessg, sender: "bot" };
        setMessage((prev) => [...prev, botMessage]);
      }
    } catch (error) {
      console.error("Error fetching bot response:", error);
      const errorMessage = {
        text: "Sorry, something went wrong.",
        sender: "bot",
      };
      setMessage((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chatbot-container">
      
      <div className="chatbot-head-container">
        <div className="chatbot-header">SpoofyBot</div>
        <div className="chatbot-icon"><MdOutlineAccountCircle size={30} color="white" /></div>
        
    </div>


      <div className="chatbot-messages">
        { message.length===0 ? (<div className="empty-chat">Hi,I am spoofyBot</div>) :( message.map((msg, index) => (
          <div  
            key={index}
            className={`message ${
              msg.sender === "user" ? "user-message" : "bot-message"
            }`}
          >
            {msg.text}
          </div>
        )))}
        {loading && (
          <div className="bot-thinking-bubble">
            <div className="dot-flashing"></div>
          </div>
        )}
        <div ref={messageEndRef} />
      </div>
      <form className="chatbot-input-form" onSubmit={handleFunction}>
        <input
          type="text"
          placeholder="Ask SpoofyBot..."
          className="chatbot-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
        />
        <button type="submit" className="chatbot-button" disabled={loading}>
          {loading ? "..." : "Send"}
        </button>
      </form>
    </div>
  );
}

export default Chatbot;
