"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { client } from "./_providers/client";

export default function Home() {
  const [name, setName] = useState("");

  const { mutate: createChat, isPending } = useMutation({
    mutationKey: ["createChat"],
    mutationFn: (name: string) =>
      client.chats.createChat.post({
        name,
      }),
    onSuccess: (data) => {
      if (data) router.push(`/chats/${data.chatId}`);
    },
  });

  const router = useRouter();
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-t-lg">
        <h1 className="text-3xl font-bold text-center text-white my-2">
          Ollama Chat
        </h1>
      </div>

      <div className="bg-gray-800 p-6 rounded-b-lg shadow-lg mb-8">
        <div className="text-center mb-8">
          <p className="text-lg text-gray-300 mb-4">
            Welcome to Ollama Chat - your personal AI conversation platform
            powered by Ollama models. Create new chat sessions, interact with
            advanced AI models, and manage your conversations all in one place.
          </p>
          <p className="text-gray-400">
            Get started by creating a new chat below or browse your existing
            conversations.
          </p>
        </div>

        <div className="max-w-md mx-auto bg-gray-700 p-6 rounded-lg shadow-inner">
          <label
            htmlFor="chatName"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Name your conversation
          </label>
          <input
            id="chatName"
            type="text"
            className="border border-gray-500 bg-gray-600 text-white p-3 rounded-md w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="E.g., Python Help, Travel Planning..."
          />

          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <button
              className={`bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-md flex-1 transition-colors duration-200 ${
                isPending ? "opacity-70 cursor-not-allowed" : ""
              }`}
              onClick={() => name.trim() && createChat(name)}
              disabled={isPending || !name.trim()}
            >
              {isPending ? "Creating..." : "Create New Chat"}
            </button>
            <button
              className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-3 rounded-md flex-1 transition-colors duration-200"
              onClick={() => router.push("/chats")}
            >
              View All Chats
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
