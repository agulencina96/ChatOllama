"use client";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { client } from "../_providers/client";

export default function ChatList() {
  const {
    data: chats,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["chats"],
    queryFn: () => client.chats.getAllChats.get(),
  });

  return error ? (
    <div className="p-4 text-center text-red-500 bg-gray-700 rounded-md">
      <p className="font-medium">Error: {error.message}</p>
    </div>
  ) : isLoading ? (
    <div className="flex justify-center items-center p-10">
      <div className="animate-pulse text-gray-300">Cargando chats...</div>
    </div>
  ) : (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-t-lg">
        <h1 className="text-3xl font-bold text-center text-white my-2">
          Mis chats
        </h1>
      </div>

      <div className="bg-gray-800 p-6 rounded-b-lg shadow-lg">
        {chats?.chats && chats.chats.length > 0 ? (
          <ul className="divide-y divide-gray-700">
            {chats.chats.map((chat) => (
              <li key={chat.id}>
                <Link href={`/chats/${chat.id}`}>
                  <div className="flex items-center p-4 hover:bg-gray-700 transition-colors rounded-md">
                    <div className="mr-3 text-blue-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-200">
                        {chat.name || "Conversación sin nombre"}
                      </p>
                    </div>
                    <div className="text-blue-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col items-center justify-center py-10 px-4 text-center bg-gray-700 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-gray-400 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <p className="text-gray-300 mb-2">No hay conversaciones aún</p>
            <p className="text-gray-400 text-sm">
              Inicia una nueva conversación para comenzar
            </p>
            <Link href="/">
              <div className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200">
                Crear nuevo chat
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
