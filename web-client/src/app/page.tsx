"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { client } from "./_providers/client";

export default function Home() {
  const [name, setName] = useState("");

  const { mutate: createChat } = useMutation({
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
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold text-center my-4">Ollama Chat</h1>
      <div className="flex justify-center space-x-4">
        <input
          type="text"
          className="border p-2 rounded text-black"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => createChat(name)}
        >
          Create New Chat
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={() => router.push("/chats")}
        >
          View All Chats
        </button>
      </div>
    </div>
  );
}
