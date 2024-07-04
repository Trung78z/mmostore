import { FaFacebook } from "react-icons/fa";
import { Input, Textarea } from "@headlessui/react";
import { IoIosChatbubbles, IoIosTime, IoMdMailOpen } from "react-icons/io";
export default function Contact() {
  return (
    <div className="py-10">
      <div className="box mx-auto max-w-screen-lg rounded-md bg-background p-2 shadow-lg md:p-10 lg:p-14">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <ul className="list-none space-y-4">
            <h2 className="pb-4 text-xl font-semibold text-blue-700">
              Liên hệ hỗ trợ
            </h2>
            <li className="text-md font-medium text-emerald-800 hover:text-gray-600/80">
              Câu hỏi thường gặp
            </li>
            <li className="text-md flex cursor-pointer items-center gap-x-2 font-medium text-emerald-800 hover:text-gray-800">
              <FaFacebook className="h-6 w-6" />
              <span> Tạp hóa Zalo</span>
            </li>
            <li className="text-md flex cursor-pointer items-center gap-x-2 font-medium text-emerald-800 hover:text-gray-800">
              <IoIosChatbubbles className="h-6 w-6" />
              <span>Chat với hỗ trợ viên</span>
            </li>
            <li className="text-md flex cursor-pointer items-center gap-x-2 font-medium text-emerald-800 hover:text-gray-800">
              <IoMdMailOpen className="h-6 w-6" />
              <span>Support@taphoammo.net</span>
            </li>
            <li className="text-md flex cursor-pointer items-center gap-x-2 font-medium text-emerald-800 hover:text-gray-800">
              <IoIosTime className="h-6 w-6" />
              <span>Mon-Sat 08:00am - 10:00pm</span>
            </li>
          </ul>
          <form htmlFor="Email">
            <ul className="space-y-4">
              <h2 className="pb-4 text-xl font-semibold text-blue-700">
                Tin nhắn
              </h2>
              <li className="text-md grid max-w-full grid-cols-1 items-center gap-x-2 font-medium lg:grid-cols-2">
                <div className="flex flex-1 flex-col">
                  <label htmlFor="Email" className="cursor-pointer">
                    Email:
                  </label>
                  <Input
                    type="email"
                    name="Email"
                    id="Email"
                    required
                    className="min-h-8 rounded-md border pl-2 data-[focus]:bg-blue-100 data-[hover]:shadow"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="tel" className="cursor-pointer">
                    Số điện thoại:
                  </label>
                  <Input
                    type="tel"
                    name="tel"
                    id="tel"
                    required
                    className="min-h-8 rounded-md border pl-2 data-[focus]:bg-blue-100 data-[hover]:shadow"
                  />
                </div>
              </li>
              <li className="text-md flex items-center gap-x-2 font-medium">
                <div className="flex flex-1 flex-col">
                  <label htmlFor="title" className="cursor-pointer">
                    Chủ đề:
                  </label>
                  <Input
                    type="text"
                    name="title"
                    id="title"
                    required
                    className="min-h-8 rounded-md border pl-2 data-[focus]:bg-blue-100 data-[hover]:shadow"
                  />
                </div>
              </li>
              <li className="text-md flex items-center gap-x-2 font-medium">
                <div className="flex flex-1 flex-col">
                  <label htmlFor="description" className="cursor-pointer">
                    Nội dung:
                  </label>
                  <Textarea
                    name="description"
                    className="min-h-20 rounded-md border data-[focus]:bg-blue-100 data-[hover]:shadow"
                  ></Textarea>
                </div>
              </li>
            </ul>
          </form>
        </div>
      </div>
    </div>
  );
}
