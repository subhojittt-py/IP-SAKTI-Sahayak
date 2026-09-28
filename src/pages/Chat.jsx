import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import { sendChatMessage } from "../services/api";
import sahayakIcon from "../assets/sahayak-icon.png";

function Chat() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "assistant",
      content:
        "Hello! I am IP-SAKTI-Sahayak. I can help you with intellectual property, regulatory requirements, traditional knowledge, and jurisdiction-specific information.",
      sources: [],
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const messagesContainerRef = useRef(null);
  const latestMessageRef = useRef(null);

  /*
   * Keep the latest message visible
   * without forcing the entire page to jump.
   */
  useEffect(() => {
    if (messages.length > 1) {
      latestMessageRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [messages]);

  const suggestedQuestions = [
    "How can I protect an Ayurvedic formulation?",
    "What are the IP requirements in India?",
    "Compare patent protection in India and the USA.",
    "What documents are required for an IP application?",
  ];

  const handleSend = async (messageText = input) => {
    const question = messageText.trim();

    if (!question || loading) {
      return;
    }

    const userMessage = {
      id: Date.now(),
      role: "user",
      content: question,
      sources: [],
    };

    setMessages((previousMessages) => [
      ...previousMessages,
      userMessage,
    ]);

    setInput("");
    setLoading(true);

    try {
      const response = await sendChatMessage(question);

      const assistantMessage = {
        id: Date.now() + 1,
        role: "assistant",
        content:
          response?.answer ||
          response?.message ||
          "I could not generate a response.",
        sources: response?.sources || [],
      };

      setMessages((previousMessages) => [
        ...previousMessages,
        assistantMessage,
      ]);
    } catch (error) {
      console.error("Chat API error:", error);

      const errorMessage = {
        id: Date.now() + 1,
        role: "assistant",
        content:
          "Sorry, I couldn't connect to the IP-SAKTI-Sahayak backend. Please make sure the backend server is running.",
        sources: [],
        error: true,
      };

      setMessages((previousMessages) => [
        ...previousMessages,
        errorMessage,
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: Date.now(),
        role: "assistant",
        content:
          "Chat cleared. How can I help you with intellectual property or regulatory information?",
        sources: [],
      },
    ]);
  };

  return (
    <div className="chat-page">

      {/* =====================================================
          Chat Header
          ===================================================== */}
      <header className="chat-header">

        <div className="chat-header-brand">

          <div className="chat-header-icon">
            <img
              src={sahayakIcon}
              alt="Sahayak"
              draggable="false"
            />
          </div>

          <div className="chat-header-info">
            <div className="chat-header-title-row">
              <h1>IP-SAKTI-Sahayak</h1>

              <span className="chat-online-status">
                <span className="chat-online-dot"></span>
                Online
              </span>
            </div>

            <p>
              AI-powered Intellectual Property Assistant
            </p>
          </div>

        </div>

        <button
          type="button"
          className="clear-chat-button"
          onClick={clearChat}
        >
          Clear Chat
        </button>

      </header>


      {/* =====================================================
          Main Chat Area
          ===================================================== */}
      <main className="chat-container">

        <div
          className="messages-container"
          ref={messagesContainerRef}
        >

          {messages.map((message, index) => (
            <div
              key={message.id}
              ref={
                index === messages.length - 1
                  ? latestMessageRef
                  : null
              }
              className={`message-wrapper ${
                message.role === "user"
                  ? "user-message"
                  : "assistant-message"
              }`}
            >

              {/* Message Avatar */}
              <div className="message-avatar">

                {message.role === "user" ? (
                  "You"
                ) : (
                  <img
                    src={sahayakIcon}
                    alt="Sahayak"
                    className="chat-message-icon"
                    draggable="false"
                  />
                )}

              </div>


              {/* Message Content */}
              <div className="message-content">

                <div className="message-bubble">
                  <p>{message.content}</p>
                </div>


                {/* Sources */}
                {message.sources?.length > 0 && (
                  <div className="sources">

                    <h4>Sources</h4>

                    {message.sources.map(
                      (source, sourceIndex) => (
                        <div
                          className="source-item"
                          key={
                            source.id ||
                            source.url ||
                            sourceIndex
                          }
                        >

                          <span className="source-number">
                            [{sourceIndex + 1}]
                          </span>

                          <div>

                            <strong>
                              {source.title ||
                                "Source"}
                            </strong>

                            {source.jurisdiction && (
                              <span className="source-jurisdiction">
                                {" "}
                                —{" "}
                                {source.jurisdiction}
                              </span>
                            )}

                            {source.url && (
                              <a
                                href={source.url}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                View Source
                              </a>
                            )}

                          </div>

                        </div>
                      )
                    )}

                  </div>
                )}

              </div>

            </div>
          ))}


          {/* =================================================
              Loading / Typing Indicator
              ================================================= */}
          {loading && (
            <div className="message-wrapper assistant-message">

              <div className="message-avatar">
                <img
                  src={sahayakIcon}
                  alt="Sahayak"
                  className="chat-message-icon"
                  draggable="false"
                />
              </div>

              <div className="message-content">

                <div className="message-bubble loading-bubble">
                  <span className="loading-dot"></span>
                  <span className="loading-dot"></span>
                  <span className="loading-dot"></span>
                </div>

              </div>

            </div>
          )}

        </div>


        {/* =====================================================
            Suggested Questions
            ===================================================== */}
        {messages.length === 1 && !loading && (
          <div className="suggested-questions">

            <h3>Try asking</h3>

            <div className="suggestion-list">

              {suggestedQuestions.map((question) => (
                <button
                  type="button"
                  key={question}
                  onClick={() => handleSend(question)}
                >
                  {question}
                </button>
              ))}

            </div>

          </div>
        )}


        {/* =====================================================
            Chat Input
            ===================================================== */}
        <div className="chat-input-area">

          <textarea
            value={input}
            onChange={(event) =>
              setInput(event.target.value)
            }
            onKeyDown={handleKeyDown}
            placeholder="Ask about intellectual property, regulations, patents, traditional knowledge..."
            rows={1}
            disabled={loading}
          />

          <button
            type="button"
            className="send-button"
            onClick={() => handleSend()}
            disabled={
              !input.trim() || loading
            }
          >
            {loading ? "..." : "Send"}
          </button>

        </div>


        {/* Disclaimer */}
        <p className="chat-disclaimer">
          IP-SAKTI-Sahayak provides informational assistance
          and should not replace professional legal advice.
        </p>

      </main>
    </div>
  );
}

export default Chat;