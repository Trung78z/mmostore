"use client";
import { AuthContext } from "@/lib/hooks/AuthProvider";
import { cn, formatTimeChat } from "@/lib/utils";
import { Button, Input } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useContext, useEffect, useRef, useState } from "react";
import { IoIosSend } from "react-icons/io";
import axios, { API_URL } from "@/configs/api";
import { differenceInMinutes, format } from "date-fns";
import { useSocket } from "@/lib/hooks/socketContext";
import { CiImageOn } from "react-icons/ci";
import Swal from "sweetalert2";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IoArrowBackSharp } from "react-icons/io5";

export default function ChatRealTimeSlug() {
  const { slug } = useParams();
  const socket = useSocket();
  const { authState } = useContext(AuthContext);
  const [content, setContent] = useState("");
  const [messages, setMessages] = useState([]);
  const [roomData, setRoomData] = useState({
    id: "6",
    name: "Chăm sóc khách hàng",
    createdAt: "2024-08-17T06:37:22.856Z",
    updatedAt: "2024-08-17T06:37:22.856Z",
    serviceOrdersId: null,
    messages: [],
    members: [
      {
        id: 12,
        userId: "d6837dc2-20e7-4253-a487-635dd910052d",
        roomId: "6",
        joinedAt: "2024-08-17T06:37:22.856Z",
      },
    ],
  });
  const [image, setImage] = useState("");
  const [isImage, setIsImage] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const router = useRouter();
  const handleChange = (e) => {
    setContent(e.target.value);
  };
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");
  const chatContainerRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    if (!socket) {
      return; // Nếu socket chưa được khởi tạo, không thực hiện các thao tác tiếp theo
    }
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
      if (socket) {
        socket.off("connect", onConnect);
        socket.off("disconnect", onDisconnect);
      }
    };
  }, [socket, slug, authState.id]);

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await axios.get(`/chats/rooms/${slug}/messages`, {
          headers: { Authorization: sessionStorage.getItem("token") },
        });
        setMessages(response.data.messages);
        setRoomData(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error); // Logging lỗi
      }
    };
    fetchMessage();
  }, [slug]);

  useEffect(() => {
    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const type = file.type;

      if (type.startsWith("image/")) {
        setIsImage(true);

        const reader = new FileReader();
        reader.onloadend = () => {
          setImage(reader.result);
        };
        reader.readAsDataURL(file);

        const url = URL.createObjectURL(file);
        setImageUrl(url);
      } else {
        setIsImage(false);
      }
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSubmitting) return;
    setIsSubmitting(true);

    if (slug && authState.id && isConnected) {
      if (isImage) {
        socket.emit("chatMessage", {
          roomId: slug,
          userId: authState.id,
          content: content,
          image: image.split(",")[1],
        });
      } else {
        socket.emit("chatMessage", {
          roomId: slug,
          userId: authState.id,
          content: content,
        });
      }
      setContent("");
      setImage("");
      setIsImage(false);
      setImageUrl("");
    }
    setTimeout(() => {
      setIsSubmitting(false);
    }, 100);
  };
  const handleClickBack = () => {
    router.push("/chat");
  };
  const [checkUser, setCheckUser] = useState(false);
  useEffect(() => {
    const update = roomData.members.filter(
      (item) => item.userId === authState.id,
    );

    console.log(roomData);
    if (update.length > 0) {
      setCheckUser(true);
    }
  }, [roomData, authState.id]);
  return (
    <div className="relative col-span-1 flex min-h-[70vh] flex-col justify-between bg-background bg-slate-100 md:col-span-5">
      {checkUser ? (
        <>
          {" "}
          <div className="flex flex-col gap-y-2">
            <div className="relative flex items-center justify-center gap-x-2 rounded-md bg-slate-200 p-2 sm:justify-between">
              <Button
                className="rounded-full bg-primary p-1"
                onClick={handleClickBack}
              >
                <IoArrowBackSharp className="text-background" />
              </Button>
              <h5 className="mx-auto text-center">{roomData?.name}</h5>
            </div>
            <ul
              ref={chatContainerRef}
              className="chat-container max-h-[60vh] list-none space-y-2 overflow-x-hidden overflow-y-scroll px-2"
            >
              {messages.map((item, index) => {
                const isLastMessage = index === messages.length - 1;
                return (
                  <li
                    className={cn(
                      "ml-1 w-full space-y-2",
                      item.userId === authState.id
                        ? "flex flex-col items-end text-right text-white"
                        : "flex flex-col items-start text-start text-black",
                    )}
                    key={`${item.id}-${index}`}
                  >
                    {item.image && (
                      <div className="relative h-32 w-48">
                        <Dialog>
                          <DialogTrigger>
                            <Image
                              src={`${API_URL}/api/image/chat/${item.image}`}
                              alt="Image chat!"
                              fill="true"
                              className="rounded-md object-cover"
                            />
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogDescription className="h-96 w-full">
                                <Image
                                  src={`${API_URL}/api/image/chat/${item.image}`}
                                  alt="Image chat!"
                                  fill="true"
                                  className="rounded-md object-cover"
                                />
                              </DialogDescription>
                            </DialogHeader>
                          </DialogContent>
                        </Dialog>
                      </div>
                    )}
                    {item.content && (
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
                    )}
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
          {isImage && (
            <div className="absolute bottom-14">
              <div className="relative h-32 w-48">
                <Image
                  src={imageUrl}
                  alt="Image chat!"
                  fill="true"
                  className="object-cover"
                />
              </div>
            </div>
          )}
          <form className="relative" onSubmit={handleSubmit}>
            <Input
              className="h-10 w-full rounded-md border px-2"
              placeholder="Nhập thông tin..."
              onChange={handleChange}
              value={content}
            />
            <div className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-2">
              <label htmlFor="imageChat" className="cursor-pointer">
                <CiImageOn className="h-6 w-6 rounded-full text-blue-500" />
              </label>
              <input
                type="file"
                id="imageChat"
                className="hidden"
                onChange={handleFileChange}
              />
              <Button
                type="submit"
                disabled={content === "" && image === "" ? true : false}
              >
                <IoIosSend className="h-6 w-6 text-blue-500" />
              </Button>
            </div>
          </form>
        </>
      ) : (
        <div className="flex items-center justify-center">
          <h4> Bạn không thể xem đoạn chat này!</h4>
        </div>
      )}
    </div>
  );
}
