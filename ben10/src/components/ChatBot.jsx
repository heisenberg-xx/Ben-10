import { useState, useEffect, useRef } from "react";
import { usePostChatBotMutation } from "../redux/apis/chatBotSlice";
import azimuthLogo from "../assets/AzimuthLogo.jpg";
import Typewriter from "react-typewriter-effect";

const ChatBot = () => {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([]);
  const [isBotOpen, setIsBotOpen] = useState(false);
  const [currentBotMessage, setCurrentBotMessage] = useState("");
  const [showTypewriter, setShowTypewriter] = useState(false);
  const messagesEndRef = useRef(null);

  // RTK Query mutation hook
  const [postChatBot, { isLoading, error }] = usePostChatBotMutation();

  const toggleBot = () => {
    setIsBotOpen(!isBotOpen);
    if (!isBotOpen && messages.length === 0) {
      // Show welcome message when opening for the first time
      setShowTypewriter(true);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, showTypewriter]);

  const handleAsk = async () => {
    if (!query.trim()) return;

    const userMessage = {
      type: "user",
      text: query,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, userMessage]);

    const currentQuery = query;
    setQuery("");
    setShowTypewriter(false);

    try {
      const result = await postChatBot({ message: currentQuery }).unwrap();

      setCurrentBotMessage(result.reply);

      setTimeout(() => {
        const botMessage = {
          type: "bot",
          text: result.reply,
          timestamp: Date.now(),
        };
        setMessages((prev) => [...prev, botMessage]);
        setCurrentBotMessage("");
      }, 900);
    } catch (err) {
      console.error("Error:", err);
      const errorMessage = {
        type: "error",
        text: "Sorry, something went wrong. Please try again.",
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, errorMessage]);
      setCurrentBotMessage("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAsk();
    }
  };

  const clearChat = () => {
    setMessages([]);
    setCurrentBotMessage("");
    setShowTypewriter(true);
  };

  return (
    <>
      {!isBotOpen && (
        <div
          onClick={toggleBot}
          className="fixed bottom-3 md:left-5 left-2 text-white p-3 cursor-pointer z-50 flex flex-col items-center transform hover:scale-105 transition-transform "
        >
          <div className="h-14 w-14 border-2 border-green-600 rounded-full overflow-hidden bg-black hover:shadow-[10px_10px_70px_rgba(5,_245,_75,_0.3)]">
            <img
              className="w-full h-full object-cover"
              src={azimuthLogo}
              alt="Azmuth Logo"
            />
          </div>
          <p className="text-center md:block hidden font-customNudgeRegular text-green-600 mt-1 text-sm">
            Azmuth Here!
          </p>
        </div>
      )}

      {isBotOpen && (
        <div className="fixed bottom-3 left-2 md:left-4 bg-black border border-green-600 rounded-lg shadow-xl w-80 md:w-96 max-w-md z-40">
          <div className="text-green-600 px-5 py-3 rounded-t-lg flex justify-between items-center border-b border-green-600">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 border border-green-600 rounded-full overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src={azimuthLogo}
                  alt="Azmuth"
                />
              </div>
              <h1 className="tracking-wider font-customNudgeRegular text-sm">
                Azmuth - Creator of Omnitrix
              </h1>
            </div>
            <div className="flex gap-2">
              <button
                onClick={clearChat}
                className="text-green-600 hover:text-green-400 text-sm px-2 py-1 rounded hover:bg-green-600 hover:bg-opacity-20 transition-colors"
                title="Clear chat"
              >
                🗑️
              </button>
              <button
                onClick={toggleBot}
                className="text-green-600 hover:text-green-400 text-xl font-customNudgeRegular hover:bg-green-600 hover:bg-opacity-20 px-2 py-1 rounded transition-colors"
              >
                ×
              </button>
            </div>
          </div>
          {/* Chat Messages Area */}

          <div className="p-4">
            <div className="mb-4 h-64 overflow-y-auto space-y-3">
              {/* Welcome message */}
              {showTypewriter && messages.length === 0 && (
                <div className="flex gap-2 items-start">
                  <div className="h-6 w-6 border border-green-600 rounded-full overflow-hidden flex-shrink-0 mt-1">
                    <img
                      className="w-full h-full object-cover"
                      src={azimuthLogo}
                      alt="Azmuth"
                    />
                  </div>
                  <div className="text-green-600 font-para text-sm">
                    <Typewriter
                      text="Hi! I'm Azmuth. Ask me anything about Ben 10!"
                      typeSpeed={50}
                      cursorColor="#16a34a"
                    />
                  </div>
                </div>
              )}

              {/* Chat history */}
              {messages.map((message, index) => (
                <div key={index}>
                  {message.type === "user" && (
                    <div className="flex justify-end">
                      <div className="bg-green-600 text-white p-3 rounded-lg max-w-[80%] text-sm font-para">
                        {message.text}
                      </div>
                    </div>
                  )}

                  {message.type === "bot" && (
                    <div className="flex gap-2 items-start">
                      <div className="h-6 w-6 border border-green-600 rounded-full overflow-hidden flex-shrink-0 mt-1">
                        <img
                          className="w-full h-full object-cover"
                          src={azimuthLogo}
                          alt="Azmuth"
                        />
                      </div>
                      <div className="text-green-600 font-para p-3 rounded-lg max-w-[80%] text-sm border border-green-600 border-opacity-30 bg-green-600 bg-opacity-5">
                        <strong>Azmuth:</strong> {message.text}
                      </div>
                    </div>
                  )}

                  {message.type === "error" && (
                    <div className="flex gap-2 items-start">
                      <div className="h-6 w-6 flex-shrink-0 mt-1 flex items-center justify-center text-red-400">
                        ⚠️
                      </div>
                      <div className="bg-red-600 bg-opacity-20 border border-red-600 text-red-400 p-3 rounded-lg max-w-[80%] text-sm font-para">
                        {message.text}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Current typing message */}
              {currentBotMessage && (
                <div className="flex gap-2 items-start">
                  <div className="h-6 w-6 border border-green-600 rounded-full overflow-hidden flex-shrink-0 mt-1">
                    <img
                      className="w-full h-full object-cover"
                      src={azimuthLogo}
                      alt="Azmuth"
                    />
                  </div>
                  <div className="text-green-600 font-para p-3 rounded-lg max-w-[80%] text-sm border border-green-600 border-opacity-30 bg-green-600 bg-opacity-5">
                    <strong>Azmuth:</strong>{" "}
                    <Typewriter
                      text={currentBotMessage}
                      typeSpeed={30}
                      cursorColor="#16a34a"
                    />
                  </div>
                </div>
              )}

              {/* Loading indicator */}
              {isLoading && !currentBotMessage && (
                <div className="flex gap-2 items-start">
                  <div className="h-6 w-6 border border-green-600 rounded-full overflow-hidden flex-shrink-0 mt-1">
                    <img
                      className="w-full h-full object-cover"
                      src={azimuthLogo}
                      alt="Azmuth"
                    />
                  </div>
                  <div className="text-green-600 font-para p-3 rounded-lg text-sm border border-green-600 border-opacity-30 bg-green-600 bg-opacity-5">
                    <Typewriter
                      text="Azmuth is thinking..."
                      typeSpeed={60}
                      cursorColor="#16a34a"
                    />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="flex gap-2">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about Ben 10..."
                className="flex-1 p-3 border border-green-600 rounded text-green-600 font-para text-sm bg-black focus:ring-2 focus:ring-green-600 focus:outline-none placeholder-green-600 placeholder-opacity-60"
                disabled={isLoading}
              />
              <button
                onClick={handleAsk}
                disabled={isLoading || !query.trim()}
                className="bg-green-600 text-white px-4 py-3 rounded hover:bg-green-500 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors text-sm font-para font-medium"
              >
                {isLoading ? "..." : "Ask"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
