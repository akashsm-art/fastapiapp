import { useState, useRef, useEffect } from "react";
import { sendMessageWithMemory } from "../services/ChatService";
import type { ChatMessage } from "../services/ChatService";

const SESSION_ID = "web-session-" + Math.random().toString(36).slice(2, 9);

function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    const query = input.trim();
    if (!query || loading) return;

    const userMsg: ChatMessage = { role: "human", content: query };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await sendMessageWithMemory(query, SESSION_ID);
      const aiMsg: ChatMessage = { role: "ai", content: res.response };
      setMessages((prev) => [...prev, aiMsg]);
    } catch {
      const errMsg: ChatMessage = {
        role: "ai",
        content: "Sorry, something went wrong. Please try again.",
      };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* ---- Floating toggle button ---- */}
      <button
        id="chatbot-toggle"
        onClick={() => setIsOpen(!isOpen)}
        style={styles.toggleBtn}
        title={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? "✕" : "💬"}
      </button>

      {/* ---- Chat window ---- */}
      {isOpen && (
        <div style={styles.window}>
          {/* Header */}
          <div style={styles.header}>
            <span style={{ fontWeight: 700, fontSize: 16 }}>🤖 AI Assistant</span>
            <button onClick={() => setIsOpen(false)} style={styles.closeBtn}>
              ✕
            </button>
          </div>

          {/* Messages */}
          <div style={styles.body}>
            {messages.length === 0 && (
              <div style={styles.emptyState}>
                <span style={{ fontSize: 32 }}>🤖</span>
                <p style={{ margin: "8px 0 0", color: "#888" }}>
                  Hi! Ask me anything.
                </p>
              </div>
            )}
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  ...styles.bubble,
                  ...(msg.role === "human" ? styles.humanBubble : styles.aiBubble),
                }}
              >
                {msg.content}
              </div>
            ))}
            {loading && (
              <div style={{ ...styles.bubble, ...styles.aiBubble, opacity: 0.6 }}>
                <span style={styles.dots}>●●●</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div style={styles.inputArea}>
            <input
              id="chatbot-input"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              style={styles.input}
              disabled={loading}
            />
            <button
              id="chatbot-send"
              onClick={handleSend}
              disabled={loading || !input.trim()}
              style={{
                ...styles.sendBtn,
                opacity: loading || !input.trim() ? 0.5 : 1,
              }}
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
}

/* ---- Inline styles ---- */
const styles: Record<string, React.CSSProperties> = {
  toggleBtn: {
    position: "fixed",
    bottom: 28,
    right: 28,
    zIndex: 9999,
    width: 56,
    height: 56,
    borderRadius: "50%",
    border: "none",
    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    color: "#fff",
    fontSize: 24,
    cursor: "pointer",
    boxShadow: "0 4px 20px rgba(99,102,241,.45)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "transform .2s, box-shadow .2s",
  },
  window: {
    position: "fixed",
    bottom: 96,
    right: 28,
    zIndex: 9998,
    width: 380,
    maxWidth: "calc(100vw - 56px)",
    height: 520,
    maxHeight: "calc(100vh - 140px)",
    borderRadius: 16,
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    background: "#fff",
    boxShadow: "0 12px 40px rgba(0,0,0,.18)",
    border: "1px solid #e5e7eb",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "14px 18px",
    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    color: "#fff",
  },
  closeBtn: {
    background: "transparent",
    border: "none",
    color: "#fff",
    fontSize: 18,
    cursor: "pointer",
  },
  body: {
    flex: 1,
    overflowY: "auto" as const,
    padding: "16px 14px",
    display: "flex",
    flexDirection: "column",
    gap: 10,
    background: "#f9fafb",
  },
  emptyState: {
    textAlign: "center" as const,
    marginTop: 60,
  },
  bubble: {
    maxWidth: "80%",
    padding: "10px 14px",
    borderRadius: 14,
    fontSize: 14,
    lineHeight: 1.5,
    wordBreak: "break-word" as const,
    whiteSpace: "pre-wrap" as const,
  },
  humanBubble: {
    alignSelf: "flex-end",
    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    color: "#fff",
    borderBottomRightRadius: 4,
  },
  aiBubble: {
    alignSelf: "flex-start",
    background: "#fff",
    color: "#1f2937",
    border: "1px solid #e5e7eb",
    borderBottomLeftRadius: 4,
  },
  dots: {
    animation: "pulse 1s infinite",
    letterSpacing: 3,
  },
  inputArea: {
    display: "flex",
    padding: "10px 12px",
    gap: 8,
    borderTop: "1px solid #e5e7eb",
    background: "#fff",
  },
  input: {
    flex: 1,
    padding: "10px 14px",
    borderRadius: 10,
    border: "1px solid #d1d5db",
    fontSize: 14,
    outline: "none",
  },
  sendBtn: {
    width: 42,
    height: 42,
    borderRadius: 10,
    border: "none",
    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    color: "#fff",
    fontSize: 18,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

export default ChatBot;
