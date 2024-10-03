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
import Swal from "sweetalert2";
import { useContext } from "react";
import { AuthContext } from "@/lib/hooks/AuthProvider";
import { toast } from "react-toastify";
export default function FooterPage() {
  const pathname = usePathname();
  const router = useRouter();
  const { authState } = useContext(AuthContext);
  const handleClickSell = () => {
    if (authState.status === false) {
      return router.push("/dang-nhap");
    }

    if (authState.role !== "USER") {
      return toast("Bạn đã là người bán hàng!");
    }
    return Swal.fire({
      title: "Bán hàng!",
      html: `<div className="font-sans leading-relaxed">
  <h2 className="text-2xl font-bold text-gray-800 mb-4">Nền Tảng Giao Dịch Nhanh Chóng</h2>
  <p className="text-gray-700 mb-2">Người chủ sàn đóng vai trò trung gian trực tiếp giữa người mua và người bán, đảm bảo giao dịch nhanh, hiệu quả và an toàn tuyệt đối. <span className="font-semibold text-indigo-600">Đặc biệt, 100 vé tham gia đầu tiên sẽ hoàn toàn miễn phí!</span></p>
  <p className="text-gray-700">Tại đây, bạn có thể mua bán nhanh các dịch vụ trên <span className="font-semibold text-indigo-600">Facebook, Zalo, Telegram, Tiktok</span> và nhiều nền tảng khác, hoặc tận dụng vai trò trung gian giữa các sàn giao dịch.</p>
</div>
`,
      icon: "info",
      reverseButtons: true,
      showCancelButton: true,
      confirmButtonText: "Bán hàng!",
      cancelButtonText: "Không!",
    }).then((res) => {
      if (res.value) {
        router.push("/user/dang-ki-ban-hang");
      }
    });
  };
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
              <li className="ml-0">
                <Link
                  href="/chat"
                  className="text-md ml-0 flex cursor-pointer items-center gap-x-2 font-medium text-gray-600 hover:text-gray-800"
                >
                  <IoIosChatbubbles className="h-6 w-6" />
                  <span>Chat với hỗ trợ viên</span>
                </Link>
              </li>
              <li className="ml-0">
                <Link
                  href="https://m.facebook.com/shoptaphoazalo?mibextid=LQQJ4d"
                  target="_blank"
                  className="text-md ml-0 flex cursor-pointer items-center gap-x-2 font-medium text-gray-600 hover:text-gray-800"
                >
                  <FaFacebook className="h-6 w-6" />
                  <span> Tạp hóa Zalo</span>
                </Link>
              </li>
              <li className="text-md ml-0 flex cursor-pointer items-center gap-x-2 font-medium text-gray-600 hover:text-gray-800">
                <IoMdMailOpen className="h-6 w-6" />
                <span>Shoptaphoazalo@gmail.com</span>
              </li>
              <li className="text-md ml-0 flex cursor-pointer items-center gap-x-2 font-medium text-gray-600 hover:text-gray-800">
                <IoIosTime className="h-6 w-6" />
                <span>Thời gian hoạt động của sàn 24/7</span>
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
              <Link href="/faqs">
                <li className="text-md ml-0 flex cursor-pointer items-center gap-x-2 font-medium text-gray-600 hover:text-gray-800">
                  Câu hỏi thường gặp
                </li>
              </Link>
              <Link href="/quy-dinh">
                <li className="text-md ml-0 flex cursor-pointer items-center gap-x-2 font-medium text-gray-600 hover:text-gray-800">
                  <span>Điều khoản sử dụng</span>
                </li>
              </Link>
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
                  onClick={handleClickSell}
                >
                  Tham gia
                </Button>
              </li>
              <li className="text-md ml-0 font-medium text-gray-600 hover:text-gray-800">
                Theo dõi chúng tôi trên mạng xã hội
              </li>
              <li className="ml-0 flex items-center gap-x-2">
                <Link
                  href="https://m.facebook.com/shoptaphoazalo?mibextid=LQQJ4d"
                  target="_blank"
                >
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
                  href="https://zalo.me/0565392901"
                  target="_blank"
                  className="relative max-h-10 min-h-10 min-w-10 max-w-10 rounded-full pl-2"
                >
                  <Logo />
                </Link>
              </li>
            </ul>
          </div>

          <hr />
          <div className="flex flex-col items-center justify-between pb-2 font-semibold text-blue-700 md:flex-row">
            <p>Cty TNHH truyền thông bunmedia | Mã số thuế: 3401249293.</p>
            <span>Mua nhanh bán nhanh, hoàn tất giao dịch chưa tới 2p</span>
          </div>
        </div>
      )}
    </>
  );
}
