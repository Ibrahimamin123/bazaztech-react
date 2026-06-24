import { useState } from "react";
import axios from "axios";
import "../App.css";

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hi 👋 I am Bazaz Tech Assistant. Ask me anything!" },
  ]);
  const [loading, setLoading] = useState(false);

  // send message
 const sendMessage = async () => {
  if (!input.trim()) return;

  const userMessage = input;

  setMessages((prev) => [
    ...prev,
    { role: "user", text: userMessage }
  ]);

  setInput("");
  setLoading(true);

  try {
    const res = await axios.post("http://localhost:5000/chat", {
      message: userMessage,
    });

    setMessages((prev) => [
      ...prev,
      { role: "bot", text: res.data.reply }
    ]);
  } catch (error) {
    console.log(error);

    setMessages((prev) => [
      ...prev,
      {
        role: "bot",
        text: "Server Error. Please check backend."
      }
    ]);
  }

  setLoading(false);
};

  return (
    <div className="chatbot-wrapper">
      {/* floating button */}
      <button className="chatbot-btn" onClick={() => setOpen(!open)}>
        💬
      </button>

      {/* CHAT BOX */}
      {open && (
        <div className="chatbot-box">
          {/* HEADER */}
          <div className="chat-header">
            <h5>Bazaz AI Assistant</h5>
            <button onClick={() => setOpen(false)}>✖</button>
          </div>

          {/* MESSAGES */}
          <div className="chat-body">
            {messages.map((msg, i) => (
              <div key={i} className={`chat-msg ${msg.role}`}>
                {msg.text}
              </div>
            ))}

            {loading && <div className="chat-msg bot">Typing...</div>}
          </div>

          {/* INPUT */}
          <div className="chat-footer">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question..."
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />

            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
