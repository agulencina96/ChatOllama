"use client";
import { use, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { client } from "@/app/_client/";

export default function Chat({
  params,
}: {
  params: Promise<{
    chatId: string;
  }>;
}) {
  const { chatId } = use(params);
  const [message, setMessage] = useState("");

  const {
    data: messages,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["messages", chatId],
    queryFn: () =>
      client.api.getAllMessages.get({
        queryParameters: {
          chatId,
        },
      }),
  });

  const { mutate: sendMessage, isPending } = useMutation({
    mutationKey: ["sendMessage"],
    mutationFn: (text: string) =>
      client.api.sendMessage.post({
        chatId,
        text,
      }),
    onSuccess: () => {
      refetch();
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching messages</div>;

  return (
    <div className="flex flex-col h-screen bg-gray-100 p-4">
      <div className="flex-1 overflow-y-auto mb-4">
        {messages?.messages?.map((msg, index) => (
          <div className="" key={index}>
            <div key={index} className="mb-2">
              <div className="bg-white p-3 rounded-lg shadow-sm w-1/2 ml-auto mb-2">
                <p className="text-gray-800">{msg.text}</p>
              </div>
              {msg.response && (
                <div className="mt-1 bg-gray-200 p-2 rounded-lg shadow-sm w-1/2 mr-auto mb-2">
                  <p className="text-gray-700">{msg.response}</p>
                </div>
              )}
            </div>
          </div>
        ))}
        {isPending && <div className="text-gray">Sending...</div>}
      </div>
      <div className="flex">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none"
          placeholder="Type a message..."
        />
        <button
          onClick={() => {
            if (message.trim()) {
              sendMessage(message);
              setMessage("");
            }
          }}
          className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
}
