"use client";
import { use, useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { client } from "@/app/_providers/client";

export default function Chat({
  params,
}: {
  params: Promise<{
    chatId: string;
  }>;
}) {
  const { chatId } = use(params);
  const [message, setMessage] = useState("");
  const [selectedModel, setSelectedModel] = useState("");

  const {
    data: messages,
    isLoading: messagesLoading,
    isError: messagesError,
    refetch,
  } = useQuery({
    queryKey: ["messages", chatId],
    queryFn: () =>
      client.messages.getAllMessages.get({
        queryParameters: {
          chatId,
        },
      }),
  });

  const {
    data: models,
    isLoading: modelsLoading,
    isError: modelsError,
  } = useQuery({
    queryKey: ["models"],
    queryFn: () => client.models.getAvailableModels.get(),
  });

  useEffect(() => {
    if (models?.models && models.models.length > 0 && !selectedModel) {
      const modelName = models.models[0].name;
      if (modelName) {
        setSelectedModel(modelName);
      }
    }
  }, [models, selectedModel]);

  const { mutate: sendMessage, isPending } = useMutation({
    mutationKey: ["sendMessage"],
    mutationFn: (text: string) =>
      client.messages.sendMessage.post({
        chatId,
        text,
        modelName: selectedModel,
      }),
    onSuccess: () => {
      refetch();
    },
  });

  if (messagesLoading || modelsLoading)
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="animate-pulse text-gray-300 font-medium">
          Loading...
        </div>
      </div>
    );

  if (messagesError || modelsError)
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="text-red-400 font-medium">Error loading data</div>
      </div>
    );

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 sticky top-0 z-10 shadow-lg">
        <label
          htmlFor="model-select"
          className="block text-sm font-medium text-white mb-2"
        >
          Select Model:
        </label>
        <select
          id="model-select"
          className="w-full p-3 border border-gray-700 rounded-md text-white bg-gray-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value)}
        >
          {models?.models?.map((model) => (
            <option key={model.name ?? ""} value={model.name ?? ""}>
              {model.name ? `${model.name.split(":")[0]}` : ""}
              {model.size
                ? ` (${(model.size / 1024 / 1024 / 1024).toFixed(2)}GB)`
                : ""}
            </option>
          ))}
        </select>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-800">
        {messages?.messages?.map((msg, index) => (
          <div key={index} className="flex flex-col space-y-4">
            <div className="flex justify-end">
              <div className="bg-blue-600 bg-opacity-20 border border-blue-500 border-opacity-30 p-4 rounded-lg shadow-md max-w-[80%]">
                <p className="text-white whitespace-pre-wrap">{msg.text}</p>
                {msg.modelName && (
                  <div className="text-xs text-gray-300 mt-2 flex items-center">
                    <span className="mr-1">Model:</span>
                    <span className="bg-blue-800 px-2 py-1 rounded-md">
                      {msg.modelName.split(":")[0]}
                    </span>
                  </div>
                )}
              </div>
            </div>
            {msg.response && (
              <div className="flex justify-start">
                <div className="bg-gray-700 border border-gray-600 p-4 rounded-lg shadow-md max-w-[80%]">
                  <p className="text-gray-200 whitespace-pre-wrap">
                    {msg.response}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
        {isPending && (
          <div className="flex justify-start">
            <div className="bg-gray-700 border border-gray-600 p-4 rounded-lg shadow-md">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-6 border-t border-gray-700 bg-gray-800">
        <div className="flex shadow-lg rounded-md overflow-hidden">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 p-4 text-white bg-gray-700 border-none focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Type a message..."
            onKeyDown={(e) => {
              if (e.key === "Enter" && message.trim() && !isPending) {
                sendMessage(message);
                setMessage("");
              }
            }}
          />
          <button
            onClick={() => {
              if (message.trim()) {
                sendMessage(message);
                setMessage("");
              }
            }}
            disabled={!selectedModel || isPending}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? "Sending..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}
