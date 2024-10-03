import Image from "next/image";
import Link from "next/link";
import { IoIosSend } from "react-icons/io";
export default function ChatRealTime() {
  return (
    <div className="col-span-5 flex flex-col items-center justify-center bg-background">
      <h5 className="text-4xl font-bold text-purple-600">
        Chat gặp tư vấn viên!
      </h5>
      <p>Lựa chọn nhân viên bên trái!</p>
    </div>
  );
}
{
  /* <div>
        <div>
          <input
            type="text"
            placeholder="User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
          <button onClick={getUserRooms}>Get User Rooms</button>
        </div>
        <div>
          <h3>User Rooms:</h3>
          <ul>
            {rooms.map((room) => (
              <li key={room.id}>
                Room ID: {room.id}, Room Name: {room.name}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <input
            type="text"
            placeholder="Room ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          />
          <input
            type="text"
            placeholder="User ID"
            value={userIdForJoin}
            onChange={(e) => setUserIdForJoin(e.target.value)}
          />
          <button onClick={joinRoom}>Join Room</button>
        </div>
        <div>
          <ul id="messages">
            {messages.map((msg, index) => (
              <li key={index}>
                {msg.userId}: {msg.content}
              </li>
            ))}
          </ul>
          <form onSubmit={handleSubmit}>
            <input id="input" autoComplete="off" />
            <button type="submit">Send</button>
          </form>
        </div>
      </div> */
}
