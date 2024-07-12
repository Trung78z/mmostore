"use client";
import { IoIosChatbubbles } from "react-icons/io";
import { FaFacebook } from "react-icons/fa";
import { IoMdMailOpen } from "react-icons/io";
import { IoIosTime } from "react-icons/io";
import { Button } from "@headlessui/react";
import Link from "next/link";
import { IoLogoInstagram } from "react-icons/io";
import Logo from "./Logo";
import { usePathname, useRouter } from "next/navigation";
export default function FooterPage() {
  const pathname = usePathname();
  const router = useRouter();
  function handleDangKi() {
    router.push("/dang-ki");
  }
  return (
    <>
      {!pathname.startsWith("/quan-li-cua-hang") && (
        <div className="space-y-4 border-t px-2 pb-2 pt-10 lg:px-32">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-10 lg:grid-cols-3">
            <ul className="list-none space-y-2">
              <h2 className="pb-2 text-lg font-semibold">Liên hệ</h2>
              <li className="text-md ml-0 font-medium text-gray-600 hover:text-gray-800">
                Liên hệ ngay nếu bạn có khó khăn khi sử dụng dịch vụ hoặc cần
                hợp tác.
              </li>
              <li className="text-md ml-0 flex cursor-pointer items-center gap-x-2 font-medium text-gray-600 hover:text-gray-800">
                <IoIosChatbubbles className="h-6 w-6" />
                <span>Chat với hỗ trợ viên</span>
              </li>
              <li className="text-md ml-0 flex cursor-pointer items-center gap-x-2 font-medium text-gray-600 hover:text-gray-800">
                <FaFacebook className="h-6 w-6" />
                <span> Tạp hóa Zalo</span>
              </li>
              <li className="text-md ml-0 flex cursor-pointer items-center gap-x-2 font-medium text-gray-600 hover:text-gray-800">
                <IoMdMailOpen className="h-6 w-6" />
                <span>Support@taphoammo.net</span>
              </li>
              <li className="text-md ml-0 flex cursor-pointer items-center gap-x-2 font-medium text-gray-600 hover:text-gray-800">
                <IoIosTime className="h-6 w-6" />
                <span>Mon-Sat 08:00am - 10:00pm</span>
              </li>
            </ul>
            <ul className="list-none space-y-2">
              <h2 className="pb-2 text-lg font-semibold">Thông tin</h2>
              <li className="text-md ml-0 font-medium text-gray-600 hover:text-gray-800">
                Một ứng dụng nhằm kết nối, trao đổi, mua bán trong cộng đồng
                kiếm tiền online.
              </li>
              <li className="text-md ml-0 flex cursor-pointer items-center gap-x-2 font-medium text-gray-600 hover:text-gray-800">
                <span>Thanh toán tự động, nhận hàng ngay tức thì.</span>
              </li>
              <li className="text-md ml-0 flex cursor-pointer items-center gap-x-2 font-medium text-gray-600 hover:text-gray-800">
                Câu hỏi thường gặp
              </li>
              <li className="text-md ml-0 flex cursor-pointer items-center gap-x-2 font-medium text-gray-600 hover:text-gray-800">
                <span>Điều khoản sử dụng</span>
              </li>
            </ul>
            <ul className="list-none space-y-2">
              <h2 className="pb-2 text-lg font-semibold">Đăng ký bán hàng</h2>
              <li className="text-md ml-0 font-medium text-gray-600 hover:text-gray-800">
                Tạo một gian hàng của bạn trên trang của chúng tôi. Đội ngũ hỗ
                trợ sẽ liên lạc để giúp bạn tối ưu khả năng bán hàng.
              </li>
              <li className="ml-0">
                <Button
                  className="rounded bg-primary px-4 py-2 text-sm text-white data-[hover]:bg-primary/80 data-[hover]:data-[active]:bg-primary/90"
                  onClick={handleDangKi}
                >
                  Tham gia
                </Button>
              </li>
              <li className="text-md ml-0 font-medium text-gray-600 hover:text-gray-800">
                Theo dõi chúng tôi trên mạng xã hội
              </li>
              <li className="ml-0 flex items-center gap-x-2">
                <Link href="https://facebook.com" target="_blank">
                  <FaFacebook className="h-10 w-10 text-primary hover:text-primary/80" />
                </Link>
                <Link
                  href="https://instagram.com"
                  target="_blank"
                  className="pl-2"
                >
                  <IoLogoInstagram className="h-12 w-12 text-pink-500 hover:text-pink-500/80"></IoLogoInstagram>
                </Link>
                <Link
                  href="https://zalo.me"
                  target="_blank"
                  className="relative max-h-10 min-h-10 min-w-10 max-w-10 rounded-full pl-2"
                >
                  <Logo />
                </Link>
              </li>
            </ul>
          </div>

          <hr />

          <div className="flex items-center justify-between pb-2 font-semibold text-blue-700">
            <p>All rights reserved: TAPHOAZALO.COM.</p>
            <span>Copyright &copy;{new Date().getFullYear()}</span>
          </div>
        </div>
      )}
    </>
  );
}
