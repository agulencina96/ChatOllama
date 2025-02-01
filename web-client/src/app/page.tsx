"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { client } from "./_client/";

export default function Home() {
  const { data, error } = useQuery({
    queryKey: ["ping"],
    queryFn: async () => {
      return client.api.ping.get();
    },
  });

  const { mutate, data: postData } = useMutation({
    mutationKey: ["ping"],
    mutationFn: async () => {
      return client.api.ping.post();
    },
    onSuccess: () => {},
  });

  return (
    <div>
      <h1>PING</h1>
      {error && <div>Error: {error.message}</div>}
      {data && <div>{data.message}</div>}
      <button onClick={() => mutate()}>Ping</button>
      {postData && <div>{postData.message}</div>}
    </div>
  );
}
