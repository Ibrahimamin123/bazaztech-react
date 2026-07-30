import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaComments, FaTimes, FaPaperPlane, FaRobot } from "react-icons/fa";
import "../App.css";
import knowledge from "../data/knowledge";

// Quick-reply chips so people can explore what BazazTech offers without
// typing — includes Ebooks and Graphic Designing per the knowledge base.
const QUICK_REPLIES = ["Services", "Web Development", "Graphic Designing", "Ebooks", "SEO", "Pricing"];

// How long the "typing…" indicator stays up before the reply appears.
const TYPING_DELAY_MS = 10000;

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Hi 👋 I'm the BazazTech Assistant. Ask me about our services — web development, graphic designing, ebooks, SEO and more!",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const bodyRef = useRef(null);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [messages, loading, open]);

  const respondTo = (userMessage) => {
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setLoading(true);

    setTimeout(() => {
      const msg = userMessage.toLowerCase();

      const found = knowledge.find((item) =>
        item.keywords.some((keyword) => msg.includes(keyword.toLowerCase()))
      );

      const reply = found
        ? found.answer
        : "❌ Sorry! I can only answer questions related to BazazTech services. Try asking about web development, graphic designing, ebooks, SEO, or pricing.";

      setMessages((prev) => [...prev, { role: "bot", text: reply }]);
      setLoading(false);
    }, TYPING_DELAY_MS);
  };

  const sendMessage = () => {
    if (!input.trim() || loading) return;
    const userMessage = input;
    setInput("");
    respondTo(userMessage);
  };

  const sendQuickReply = (text) => {
    if (loading) return;
    respondTo(text);
  };

  return (
    <div className="chatbot-wrapper">
      <AnimatePresence>
        {open && (
          <motion.div
            className="chatbot-box"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {/* HEADER */}
            <div className="chat-header">
              <div className="chat-header-info">
                <span className="chat-header-avatar">
                  <FaRobot />
                </span>
                <div>
                  <h5>BazazTech Assistant</h5>
                  <span className="chat-header-status">
                    <span className="chat-status-dot" /> Online now
                  </span>
                </div>
              </div>
              <button
                className="chat-close-btn"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                type="button"
              >
                <FaTimes />
              </button>
            </div>

            {/* MESSAGES */}
            <div className="chat-body" ref={bodyRef}>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  className={`chat-msg ${msg.role}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {msg.text}
                </motion.div>
              ))}

              {loading && (
                <div className="chat-msg bot chat-typing">
                  <span className="chat-typing-dot" />
                  <span className="chat-typing-dot" />
                  <span className="chat-typing-dot" />
                </div>
              )}
            </div>

            {/* QUICK REPLIES */}
            <div className="chat-quick-replies">
              {QUICK_REPLIES.map((label) => (
                <button
                  type="button"
                  key={label}
                  className="chat-quick-chip"
                  onClick={() => sendQuickReply(label)}
                  disabled={loading}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* INPUT */}
            <div className="chat-footer">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your question..."
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                disabled={loading}
              />

              <button
                className="chat-send-btn"
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                type="button"
                aria-label="Send message"
              >
                <FaPaperPlane />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* floating button */}
      <button
        className={`chatbot-btn ${open ? "chatbot-btn-open" : ""}`}
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Toggle chat"
        type="button"
      >
        {open ? <FaTimes /> : <FaComments />}
      </button>
    </div>
  );
};

export default Chatbot;
