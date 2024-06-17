"use client";
import { Button, Input, Select } from "@headlessui/react";
import Image from "next/image";
import { FaWindowRestore } from "react-icons/fa";
import { IoMdMailOpen } from "react-icons/io";
import { FaCircleUser } from "react-icons/fa6";
import {
  HiMiniChartBarSquare,
  HiMiniRocketLaunch,
  HiMiniServerStack,
  HiMiniSquare3Stack3D,
} from "react-icons/hi2";
import clsx from "clsx";
import { useState } from "react";
import Link from "next/link";
export default function Home() {
  const [more, setMore] = useState(false);
  const handleChangeMore = () => {
    setMore(!more);
  };
  return (
    <>
      <div className="mx-auto max-w-screen-xl space-y-4 p-2 md:p-10 lg:space-y-10 lg:p-20">
        <div className="min-h-60 rounded-md bg-[url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIfTEJ-1XyZARbRXYSqFgPvdVTvCow6K4PVw&s)] bg-cover bg-no-repeat p-10 md:px-20 lg:px-24 xl:px-40">
          <ul className="space-y-4 md:space-y-10">
            <li className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Select
                name="status"
                className="rounded-md border p-2 data-[focus]:bg-blue-100 data-[hover]:shadow"
                aria-label="Project status"
              >
                <option value="active">Tùy chọn tìm kiếm</option>
                <option value="paused">Tên người bán</option>
                <option value="delayed">Email</option>
                <option value="canceled">Tài khoản</option>
                <option value="canceled">Khác</option>
              </Select>
              <Select
                name="status"
                className="rounded-md border p-2 data-[focus]:bg-blue-100 data-[hover]:shadow"
                aria-label="Project status"
              ></Select>
              <Select
                name="status"
                className="rounded-md border p-2 data-[focus]:bg-blue-100 data-[hover]:shadow"
                aria-label="Project status"
              >
                {/* <option value="active">Tùy chọn tìm kiếm</option>
                <option value="paused">Tên người bán</option>
                <option value="delayed">Email</option>
                <option value="canceled">Tài khoản</option>
                <option value="canceled">Khác</option> */}
              </Select>
            </li>
            <li className="text-md flex items-center gap-x-2 font-medium">
              <div className="flex flex-1 flex-col">
                <Input
                  type="text"
                  name="title"
                  id="title"
                  required
                  placeholder="Tìm gian hàng hoặc người bán"
                  className="min-h-10 rounded-md border pl-2 data-[focus]:bg-blue-100 data-[hover]:shadow"
                />
              </div>
            </li>
            <li className="text-center">
              <Button className="rounded bg-primary px-4 py-2 text-sm text-white data-[hover]:bg-primary/80 data-[hover]:data-[active]:bg-primary/90">
                Tìm kiếm
              </Button>
            </li>
          </ul>
        </div>
        <div className="space-y-4 px-4 md:px-0">
          <h2 className="text-center text-xl font-medium text-emerald-500">
            -- DANH SÁCH SẢN PHẨM --
          </h2>
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6 xl:grid-cols-4">
            <Link href="/danh-muc">
              <li className="flex min-h-60 items-center justify-center rounded-md border border-blue-600 text-blue-700 shadow-md hover:text-blue-700/80">
                <div className="flex flex-col items-center justify-center">
                  <IoMdMailOpen className="h-20 w-20 font-medium" />
                  <h2 className="text-center text-xl font-medium">Email</h2>
                  <p className="text-md px-10 text-center font-medium text-gray-500">
                    Gmail, yahoo mail, hot mail... và nhiều hơn thế nữa
                  </p>
                </div>
              </li>{" "}
            </Link>
            <Link href="/danh-muc">
              <li className="flex min-h-60 items-center justify-center rounded-md border border-blue-600 text-blue-700 shadow-md hover:text-blue-700/80">
                <div className="flex flex-col items-center justify-center">
                  <HiMiniServerStack className="h-20 w-20 font-medium" />
                  <h2 className="text-center text-xl font-medium">Phần mềm</h2>
                  <p className="text-md px-10 text-center font-medium text-gray-500">
                    Các phần mềm chuyên dụng cho kiếm tiền online từ những coder
                    uy tín
                  </p>
                </div>
              </li>{" "}
            </Link>
            <Link href="/danh-muc">
              <li className="flex min-h-60 items-center justify-center rounded-md border border-blue-600 text-blue-700 shadow-md hover:text-blue-700/80">
                <div className="flex flex-col items-center justify-center">
                  <FaCircleUser className="h-20 w-20 font-medium" />
                  <h2 className="text-center text-xl font-medium">Tài khoản</h2>
                  <p className="text-md px-10 text-center font-medium text-gray-500">
                    Fb, BM, key window, kaspersky....
                  </p>
                </div>
              </li>{" "}
            </Link>
            <Link href="/danh-muc">
              <li className="flex min-h-60 items-center justify-center rounded-md border border-blue-600 text-blue-700 shadow-md hover:text-blue-700/80">
                <div className="flex flex-col items-center justify-center">
                  <FaWindowRestore className="h-20 w-20 font-medium" />
                  <h2 className="text-center text-xl font-medium">Khác</h2>
                  <p className="text-md px-10 text-center font-medium text-gray-500">
                    Các sản phẩm số khác
                  </p>
                </div>
              </li>{" "}
            </Link>
          </ul>
        </div>
        <div className="space-y-4 px-4 md:px-0">
          <h2 className="text-center text-xl font-medium text-emerald-500">
            -- DANH SÁCH DỊCH VỤ --
          </h2>
          <ul
            className={clsx(
              "transition-max-height grid grid-cols-1 gap-4 overflow-hidden duration-300 ease-in-out md:grid-cols-2 lg:gap-6 xl:grid-cols-4",
            )}
          >
            <Link href="/danh-muc">
              <li className="flex min-h-60 items-center justify-center rounded-md border border-blue-600 text-blue-700 shadow-md hover:text-blue-700/80">
                <div className="flex flex-col items-center justify-center">
                  <HiMiniChartBarSquare className="h-20 w-20 font-medium" />
                  <h2 className="text-center text-xl font-medium">
                    Tăng tương tác
                  </h2>
                  <p className="text-md px-10 text-center font-medium text-gray-500">
                    Tăng like, view.share, comment... cho sản phẩm của bạn
                  </p>
                </div>
              </li>{" "}
            </Link>
            <Link href="/danh-muc">
              <li className="flex min-h-60 items-center justify-center rounded-md border border-blue-600 text-blue-700 shadow-md hover:text-blue-700/80">
                <div className="flex flex-col items-center justify-center">
                  <HiMiniServerStack className="h-20 w-20 font-medium" />
                  <h2 className="text-center text-xl font-medium">
                    Dịch vụ phần mềm
                  </h2>
                  <p className="text-md px-10 text-center font-medium text-gray-500">
                    Dịch vụ code tool MMO, đồ họa, video... và các dịch vụ liên
                    quan
                  </p>
                </div>
              </li>{" "}
            </Link>
            <Link href="/danh-muc">
              <li className="flex min-h-60 items-center justify-center rounded-md border border-blue-600 text-blue-700 shadow-md hover:text-blue-700/80">
                <div className="flex flex-col items-center justify-center">
                  <HiMiniSquare3Stack3D className="h-20 w-20 font-medium" />
                  <h2 className="text-center text-xl font-medium">
                    Blockchain
                  </h2>
                  <p className="text-md px-10 text-center font-medium text-gray-500">
                    Dịch vụ tiền ảo, NFT, coinlist... và các dịch vụ blockchain
                    khác
                  </p>
                </div>
              </li>{" "}
            </Link>
            <Link href="/danh-muc">
              <li className="flex min-h-60 items-center justify-center rounded-md border border-blue-600 text-blue-700 shadow-md hover:text-blue-700/80">
                <div className="flex flex-col items-center justify-center">
                  <HiMiniRocketLaunch className="h-20 w-20 font-medium" />
                  <h2 className="text-center text-xl font-medium">
                    Dịch vụ khác
                  </h2>
                  <p className="text-md px-10 text-center font-medium text-gray-500">
                    Các dịch vụ MMO phổ biến khác hiện nay
                  </p>
                </div>
              </li>{" "}
            </Link>
          </ul>
        </div>
        <div className="relative space-y-3 rounded-md border border-blue-600 bg-background p-2 shadow-md transition-all">
          <ul className="space-y-2">
            <h2 className="text-center text-lg font-semibold">
              Tạp hóa MMO - Chuyên trang thương mại điện tử sản phẩm số - Phục
              vụ cộng đồng MMO (Kiếm tiền online)
            </h2>
            <li
              className={clsx(
                "text-center text-sm text-gray-600",
                more ? "block" : "hidden",
              )}
            >
              Một sản phẩm ra đời với mục đích thuận tiện và an toàn hơn trong
              các giao dịch mua bán sản phẩm số.
            </li>
            <li
              className={clsx(
                "text-sm text-gray-600",
                more ? "block" : "hidden",
              )}
            >
              Như các bạn đã biết, tình trạng lừ.a đảo trên mạng xã hội kéo dài
              bao nhiêu năm nay, mặc dù đã có rất nhiều giải pháp từ cộng đồng
              như là trung gian hay bảo hiểm, nhưng vẫn rất nhiều người dùng lựa
              chọn mua bán nhanh gọn mà bỏ qua các bước kiểm tra, hay trung
              gian, từ đó tạo cơ hội cho s.c.a.m.m.e.r hoạt động. Ở Taphoammo,
              bạn sẽ có 1 trải nghiệm mua hàng yên tâm hơn rất nhiều, chúng tôi
              sẽ giữ tiền người bán 3 ngày, kiểm tra toàn bộ sản phẩm bán ra có
              trùng với người khác hay không, nhắm mục đích tạo ra một nơi giao
              dịch mà người dùng có thể tin tưởng, một trang mà người bán có thể
              yên tâm đặt kho hàng, và cạnh tranh sòng phẳng.
            </li>
          </ul>
          <ul
            className={clsx(
              "list-inside list-disc space-y-2 px-4 text-start md:px-10",
              more ? "block" : "hidden",
            )}
          >
            <h2 className="text-center text-lg font-semibold">
              Các tính năng trên trang:
            </h2>
            <li className="text-sm text-gray-600">
              Check trùng sản phẩm bán ra: toàn bộ gian hàng cam kết không bán
              trùng, hệ thống của chúng tôi sẽ kiểm tra từng sản phẩm một, để
              đảm bảo hàng đến tay người dùng chưa từng được bán cho ai khác
              trên trang, và hàng bạn đã mua, cũng không thể bán cho ai khác
              nữa.
            </li>
            <li className="text-sm text-gray-600">
              Nạp tiền và thanh toán tự động: Bạn chỉ cần nạp tiền đúng cú pháp,
              số dư của bạn sẽ đc cập nhật sau 1-5 phút. Mọi bước thanh toán và
              giao hàng đều được thực hiện ngay tức thì.
            </li>
            <li className="text-sm text-gray-600">
              {
                'Giữ tiền đơn hàng 3 ngày: Sau khi bạn mua hàng, đơn hàng đó sẽ ở trạng thái Tạm giữ tiền 3 ngày, đủ thời gian để bạn kiểm tra, đổi pass sản phẩm. Nếu có vấn đề gì, hãy nhanh chóng dùng tính năng              "Khiếu nại" nhé.'
              }
            </li>
            <li className="text-sm text-gray-600">
              {
                'Tính năng dành cho cộng tác viên (Reseller): Các bạn đọc thêm ở mục "FAQs - Câu hỏi thường gặp" nhé.'
              }
            </li>
          </ul>
          <ul
            className={clsx(
              "list-inside list-disc space-y-2 px-10 text-start md:px-20",
              more ? "block" : "hidden",
            )}
          >
            <h2 className="text-center text-lg font-semibold">
              Các mặt hàng đang kinh doanh tại Tạp Hóa Zalo
            </h2>
            <li className="text-sm text-gray-600">
              Mua bán email: Mua bán gmail, mail outlook, domain... tất cả đều
              có thể được tự do mua bán trên trang.
            </li>
            <li className="text-sm text-gray-600">
              Mua bán phần mềm MMO: các phần mềm phục vụ cho kiếm tiền online,
              như phần mềm youtube, phần mềm chạy facebook, phần mềm PTC, PTU,
              phần mềm gmail....
            </li>
            <li className="text-sm text-gray-600">
              {
                "Mua bán tài khoản: mua bán facebook, mua bán twitter, mua bán zalo, mua bán instagram."
              }
            </li>
            <li className="text-sm text-gray-600">
              {
                "Các sản phẩm số khác: VPS, key window, key diệt virus, tất cả sản phẩm số không vi phạm chính sách của chúng tôi đều được phép kinh doanh trên trang."
              }
            </li>
            <li className="text-sm text-gray-600">
              Các dịch vụ tăng tương tác (like, comment, share...), dịch vụ phần
              mềm, blockchain và các dịch vụ số khác.
            </li>
          </ul>
          <Button
            className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-2 rounded bg-primary px-4 text-sm text-white data-[hover]:bg-primary/80 data-[hover]:data-[active]:bg-primary/90"
            onClick={handleChangeMore}
          >
            {more ? "Ít hơn" : "Nhiều hơn"}
          </Button>
        </div>
      </div>
    </>
  );
}
