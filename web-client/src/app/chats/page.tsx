"use client";
import { useQuery } from "@tanstack/react-query";
import { client } from "../_client/";
import Link from "next/link";

export default function ChatList() {
  const {
    data: chats,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["chats"],
    queryFn: () => client.api.getAllChats.get(),
  });

  return error ? (
    <div>Error: {error.message}</div>
  ) : isLoading ? (
    <div>Loading...</div>
  ) : (
    <div>
      {chats?.chats?.map((chat) => (
        <Link key={chat.id} href={`/chats/${chat.id}`}>
          <p
            style={{
              display: "block",
              padding: "8px",
              borderBottom: "1px solid #ccc",
            }}
          >
            {chat.name || "Unnamed Chat"}
          </p>
        </Link>
      ))}
    </div>
  );
}
