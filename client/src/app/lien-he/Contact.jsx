import { FaFacebook, FaTelegram } from "react-icons/fa";
import { Input, Textarea } from "@headlessui/react";
import { IoIosChatbubbles, IoIosTime, IoMdMailOpen } from "react-icons/io";
import { Button } from "@/components/ui/button";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "@/configs/api";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "@/lib/hooks/AuthProvider";
import Link from "next/link";
const schema = z.object({
  email: z
    .string()
    .email({ message: "Email không đúng định dạng" })
    .min(1, { message: "Vui lòng nhập email của bạn!" }),
  phone: z
    .string()
    .min(9, { message: "Không đúng định dạng số điện thoại!" })
    .max(12, { message: "Không đúng định dạng số điện thoại!" }),
  title: z
    .string()
    .min(8, { message: "Vui lòng nhập ít nhất 8 kí tự!" })
    .max(100, { message: "Vui lòng nhập nhiều nhất 100 kí tự!" }),
  content: z.string().min(30, { message: "Vui lòng nhập ít nhất 30 kí tự!" }),
});

export default function Contact() {
  const { authState } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: zodResolver(schema) });
  async function handleContact(data) {
    if (authState.role === "ADMIN") {
      return toast("Bạn đã là admin của shop này rồi!");
    }
    if (authState.status === false) {
      return toast("Vui lòng đăng nhập để liên hệ!");
    }
    try {
      const user = await axios.post("/contacts", data, {
        headers: { Authorization: "Bearer " + sessionStorage.getItem("token") },
      });

      if (user.data.success === false) {
        return toast(user.data.msg);
      }
      toast("Cám ơn bạn đã liên hệ với chúng tôi!", { autoClose: 2000 });
      reset({ title: "", content: "", phone: "", email: "" });
    } catch (error) {
      toast.error(error.response?.data.msg);
    }
  }
  return (
    <div className="py-10">
      <div className="box mx-auto max-w-screen-lg rounded-md bg-background p-2 shadow-lg md:p-10 lg:p-14">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <ul className="list-none space-y-4">
            <h2 className="pb-4 text-xl font-semibold text-blue-700">
              Liên hệ hỗ trợ
            </h2>
            <li className="text-md ml-0 font-medium text-emerald-800 hover:text-gray-600/80">
              Câu hỏi thường gặp
            </li>
            <li className="ml-0">
              <Link
                href="https://m.facebook.com/shoptaphoazalo?mibextid=LQQJ4d"
                target="_blank"
                className="text-md flex cursor-pointer items-center gap-x-2 font-medium text-emerald-800 hover:text-gray-800"
              >
                <FaFacebook className="h-6 w-6" />
                <span> Tạp hóa Zalo</span>
              </Link>
            </li>
            <li className="ml-0">
              <Link
                href="/chat"
                className="text-md ml-0 flex cursor-pointer items-center gap-x-2 font-medium text-emerald-800 hover:text-gray-800"
              >
                <IoIosChatbubbles className="h-6 w-6" />
                <span>Chat với hỗ trợ viên</span>
              </Link>
            </li>
            <li className="text-md ml-0 flex cursor-pointer items-center gap-x-2 font-medium text-emerald-800 hover:text-gray-800">
              <IoMdMailOpen className="h-6 w-6" />
              <span>Shoptaphoazalo@gmail.com</span>
            </li>{" "}
            <li className="text-md ml-0 flex cursor-pointer items-center gap-x-2 font-medium text-emerald-800 hover:text-gray-800">
              <FaTelegram className="h-6 w-6" />
              <span>@shoptaphoazalo </span>
            </li>
            <li className="text-md ml-0 flex cursor-pointer items-center gap-x-2 font-medium text-emerald-800 hover:text-gray-800">
              <IoIosTime className="h-6 w-6" />
              <span>Thời gian hoạt động của sàn 24/7</span>
            </li>
          </ul>
          <form htmlFor="Email" onSubmit={handleSubmit(handleContact)}>
            <ul className="space-y-4">
              <h2 className="pb-4 text-xl font-semibold text-blue-700">
                Tin nhắn
              </h2>
              <li className="text-md ml-0 grid max-w-full grid-cols-1 items-center gap-x-2 font-medium lg:grid-cols-2">
                <div className="flex flex-1 flex-col">
                  <label htmlFor="Email" className="cursor-pointer">
                    Email:
                  </label>
                  <Input
                    type="email"
                    name="email"
                    {...register("email")}
                    autoComplete="email"
                    id="email"
                    className="min-h-8 rounded-md border pl-2 data-[focus]:bg-blue-100 data-[hover]:shadow"
                  />
                  {errors.email && (
                    <p className="text-red-600">{errors.email.message}</p>
                  )}
                </div>
                <div className="flex flex-col">
                  <label htmlFor="phone" className="cursor-pointer">
                    Số điện thoại:
                  </label>
                  <Input
                    type="text"
                    name="phone"
                    {...register("phone")}
                    id="phone"
                    className="min-h-8 rounded-md border pl-2 data-[focus]:bg-blue-100 data-[hover]:shadow"
                  />
                  {errors.phone && (
                    <p className="text-red-600">{errors.phone.message}</p>
                  )}
                </div>
              </li>
              <li className="text-md ml-0 flex items-center gap-x-2 font-medium">
                <div className="flex flex-1 flex-col">
                  <label htmlFor="title" className="cursor-pointer">
                    Chủ đề:
                  </label>
                  <Input
                    type="text"
                    name="title"
                    {...register("title")}
                    id="title"
                    className="min-h-8 rounded-md border pl-2 data-[focus]:bg-blue-100 data-[hover]:shadow"
                  />
                  {errors.title && (
                    <p className="text-red-600">{errors.title.message}</p>
                  )}
                </div>
              </li>
              <li className="text-md ml-0 flex items-center gap-x-2 font-medium">
                <div className="flex flex-1 flex-col">
                  <label htmlFor="content" className="cursor-pointer">
                    Nội dung:
                  </label>
                  <Textarea
                    name="content"
                    id="content"
                    {...register("content")}
                    className="min-h-20 rounded-md border data-[focus]:bg-blue-100 data-[hover]:shadow"
                  ></Textarea>{" "}
                  {errors.content && (
                    <p className="text-red-600">{errors.content.message}</p>
                  )}
                </div>
              </li>
            </ul>
            <div className="text-right">
              <Button type="submit">Liên hệ</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
