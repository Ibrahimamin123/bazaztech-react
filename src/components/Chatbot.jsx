import { useState } from "react";
import "../App.css";
import knowledge from "../data/knowledge";

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hi 👋 I am Bazaz Tech Assistant. Ask me About Bazaztech Services!" },
  ]);
  const [loading, setLoading] = useState(false);

  // send message
const sendMessage = () => {
  if (!input.trim()) return;

  const userMessage = input;

  setMessages((prev) => [
    ...prev,
    { role: "user", text: userMessage }
  ]);

  setInput("");
  setLoading(true);

 setTimeout(() => {
  const msg = userMessage.toLowerCase();

  const found = knowledge.find((item) =>
    item.keywords.some((keyword) =>
      msg.includes(keyword.toLowerCase())
    )
  );

  const reply = found
    ? found.answer
    : "❌ Sorry! I can only answer questions related to BazazTech services.";

  setMessages((prev) => [
    ...prev,
    {
      role: "bot",
      text: reply,
    },
  ]);

  setLoading(false);
}, 700);
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
