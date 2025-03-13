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

  if (messagesLoading || modelsLoading) return <div>Loading...</div>;
  if (messagesError || modelsError) return <div>Error loading data</div>;

  return (
    <div className="flex flex-col h-screen bg-gray-100 p-4">
      <div className="mb-4">
        <label
          htmlFor="model-select"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Select Model:
        </label>
        <select
          id="model-select"
          className="w-full p-2 border border-gray-300 rounded-lg text-black bg-white"
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value)}
        >
          {models?.models?.map((model) => (
            <option key={model.name ?? ""} value={model.name ?? ""}>
              {model.name ?? ""} ({model.format || "unknown"})
            </option>
          ))}
        </select>
      </div>

      <div className="flex-1 overflow-y-auto mb-4">
        {messages?.messages?.map((msg, index) => (
          <div className="" key={index}>
            <div key={index} className="mb-2">
              <div className="bg-white p-3 rounded-lg shadow-sm w-1/2 ml-auto mb-2">
                <p className="text-gray-800">{msg.text}</p>
                {msg.modelName && (
                  <span className="text-xs text-gray-500">
                    Sent to: {msg.modelName}
                  </span>
                )}
              </div>
              {msg.response && (
                <div className="mt-1 bg-gray-200 p-2 rounded-lg shadow-sm w-1/2 mr-auto mb-2">
                  <p className="text-gray-700">{msg.response}</p>
                </div>
              )}
            </div>
          </div>
        ))}
        {isPending && <div className="text-black">Sending...</div>}
      </div>
      <div className="flex">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none text-black"
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
          className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600 disabled:bg-blue-300"
        >
          Send
        </button>
      </div>
    </div>
  );
}
