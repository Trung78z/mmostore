"use client";
import { AuthContext } from "@/lib/hooks/AuthProvider";
import { cn, formatTimeChat } from "@/lib/utils";
import { Button, Input } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useContext, useEffect, useRef, useState } from "react";
import { IoIosSend } from "react-icons/io";
import axios from "@/configs/api";
import { socket } from "@/socket";
import { differenceInMinutes, format } from "date-fns";
export default function ChatRealTimeSlug() {
  const { slug } = useParams();
  const { authState } = useContext(AuthContext);
  const [content, setContent] = useState("");
  const [messages, setMessages] = useState([]);
  const handleChange = (e) => {
    setContent(e.target.value);
  };
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");
  const chatContainerRef = useRef(null);
  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await axios.get(`/chats/rooms/${slug}/messages`, {
          headers: { Authorization: sessionStorage.getItem("token") },
        });
        setMessages(response.data);
      } catch (error) {}
    };
    fetchMessage();
  }, [slug]);
  useEffect(() => {
    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name || "N/A");

      socket.io.engine.on("upgrade", (transport) => {
        setTransport(transport.name);
      });
      socket.on("chatMessage", (msg) => {
        setMessages((prevMessages) => [...prevMessages, msg]);
      });
      socket.emit("joinRoom", { roomId: slug, userId: authState.id });
    }

    function onDisconnect() {
      setIsConnected(false);
      setTransport("N/A");
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, [slug, authState.id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (slug && authState.id && content && isConnected) {
      socket.emit("chatMessage", {
        roomId: slug,
        userId: authState.id,
        content: content,
      });
      setContent("");
    }
  };

  return (
    <div className="col-span-1 flex flex-col justify-between bg-background bg-slate-100 md:col-span-5">
      <div className="flex flex-col gap-y-2">
        <div className="relative rounded-md bg-slate-200 p-2">
          <h4 className="text-center">Cám ơn bạn đã liên hệ với chúng tôi!.</h4>{" "}
          {/* {authState.role === "ADMIN" && (
            <div className="absolute right-0 top-1/2 -translate-y-1/2">
              aaaa
            </div>
          )} */}
        </div>
        <ul
          ref={chatContainerRef}
          className="chat-container max-h-[60vh] list-none space-y-2 overflow-x-hidden overflow-y-scroll px-2"
        >
          {messages.length > 0 &&
            messages.map((item, index) => {
              const isLastMessage = index === messages.length - 1;
              return (
                <li
                  className={cn(
                    "ml-1 w-full",
                    item.userId === authState.id
                      ? "flex flex-col items-end text-right text-white"
                      : "flex flex-col items-start text-start text-black",
                  )}
                  key={`${item.id}-${index}`}
                >
                  <h4
                    className={cn(
                      "w-max rounded-lg p-1 px-2 font-normal",
                      item.userId === authState.id
                        ? "bg-blue-600"
                        : "bg-slate-200",
                    )}
                  >
                    {item.content}
                  </h4>

                  {isLastMessage && (
                    <p className="text-black">
                      {formatTimeChat(item.createdAt)} trước
                    </p>
                  )}
                </li>
              );
            })}
        </ul>
      </div>
      <form className="relative" onSubmit={handleSubmit}>
        <Input
          className="h-10 w-full rounded-md border px-2"
          placeholder="Nhập thông tin..."
          onChange={handleChange}
          value={content}
        />
        <Button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2"
        >
          <IoIosSend className="h-6 w-6 text-blue-500" />
        </Button>
      </form>
    </div>
  );
}
