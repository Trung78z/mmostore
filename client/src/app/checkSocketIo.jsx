"use client";
import { useEffect, useState } from "react";
import { socket } from "../socket";
export default function CheckSocketIo() {
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");
  const [value, setValue] = useState("");

  const [messages, setMessages] = useState([
    { text: "Hello", render: "received" },
    { text: "Bạn đang làm gì", render: "received" },
    { text: "Dạo này bạn khỏe không", render: "received" },
  ]);

  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);

      socket.io.engine.on("upgrade", (transport) => {
        setTransport(transport.name);
      });
    }

    function onDisconnect() {
      setIsConnected(false);
      setTransport("N/A");
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("receive-message", (message) => {
      console.log(message);
      console.log(message);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: message.text, render: "received" },
      ]);
    });

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("receive-message");
    };
  }, []);

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (value) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: value, render: "sent" },
      ]);
      socket.emit("chat message", { text: value, render: "sent" });
      setValue("");
    }
  };
  console.log(messages);
  return (
    <main className="top-1/2 flex min-h-screen items-center justify-center bg-[#c8c8c8]">
      <form onSubmit={handleSubmit} className="rounded-md bg-white">
        <div className="flex min-h-10 min-w-full flex-col items-center justify-center rounded-t-md bg-gray-500 text-white shadow-xl">
          Chat test
        </div>
        <div className="flex max-h-[600px] min-h-[600px] w-80 flex-col justify-between">
          <ul className="ml-2 flex flex-col">
            {messages.map((item) => (
              <li
                key={item.render}
                className={`my-1 rounded-md p-2 ${
                  item.render === "sent"
                    ? "max-w-fit place-self-end bg-blue-500 text-end text-white"
                    : "self-start text-black"
                }`}
              >
                {item.text}
              </li>
            ))}
          </ul>
        </div>
        <div className="relative flex justify-between">
          <input
            placeholder="enter text..."
            onChange={handleChange}
            value={value}
            className="flex-1 rounded-md border p-2"
          ></input>
          <button
            type="submit"
            className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full"
          >
            📨
          </button>
        </div>
      </form>
    </main>
  );
}
