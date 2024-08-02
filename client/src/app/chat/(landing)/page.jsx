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
