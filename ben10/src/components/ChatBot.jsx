import { useState } from "react";
import { usePostChatBotMutation } from "../redux/apis/chatBotSlice"; // Adjust path as needed

const ChatBot = () => {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [isBotOpen, setIsBotOpen] = useState(false);

  // RTK Query mutation hook
  const [postChatBot, { isLoading, error }] = usePostChatBotMutation();

  const toggleBot = () => {
    setIsBotOpen(!isBotOpen);
  };

  const handleAsk = async () => {
    if (!query.trim()) return;

    try {
      const result = await postChatBot({ message: query }).unwrap();
      setResponse(result.reply);
      setQuery("");
    } catch (err) {
      console.error("Error:", err);
      setResponse("Sorry, something went wrong. Please try again.");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAsk();
    }
  };

  return (
    <>
      <div
        onClick={toggleBot}
        className="fixed bottom-4 right-4 bg-green-500 text-white p-3 rounded-full cursor-pointer hover:bg-green-600 transition-colors z-50"
      >
        BOT
      </div>

      {isBotOpen && (
        <div className="fixed bottom-16 right-4 bg-black border border-green-500 rounded-lg shadow-lg w-80 max-w-sm z-40">
          <div className="bg-green-500 text-white p-3 rounded-t-lg flex justify-between items-center">
            <h1 className="font-bold">Azmuth - Ben 10 Expert</h1>
            <button
              onClick={toggleBot}
              className="text-white hover:text-gray-200 text-xl"
            >
              ×
            </button>
          </div>

          <div className="p-4 max-h-96 overflow-y-auto">
            {/* Chat Messages Area */}
            <div className="mb-4 min-h-[200px] max-h-[250px] overflow-y-auto">
              {!response && (
                <div className="text-green-400 text-sm">
                  Hi! I'm Azmuth. Ask me anything about Ben 10!
                </div>
              )}

              {response && (
                <div className="mb-2">
                  <div className="bg-gray-700 text-white p-2 rounded mb-2 text-sm">
                    You: {query || "Previous question"}
                  </div>
                  <div className="bg-green-100 text-black p-2 rounded text-sm">
                    <strong>Azmuth:</strong> {response}
                  </div>
                </div>
              )}

              {isLoading && (
                <div className="text-green-400 text-sm animate-pulse">
                  Azmuth is thinking...
                </div>
              )}

              {error && (
                <div className="text-red-400 text-sm">
                  Error: {error.data?.error || "Something went wrong"}
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="flex gap-2">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about Ben 10..."
                className="flex-1 p-2 border border-gray-300 rounded text-black text-sm"
                disabled={isLoading}
              />
              <button
                onClick={handleAsk}
                disabled={isLoading || !query.trim()}
                className="bg-green-500 text-white p-2 rounded hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors text-sm"
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
