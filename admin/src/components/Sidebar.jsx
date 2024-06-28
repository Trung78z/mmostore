"use client";
import React from "react";
import { Command, CommandList } from "@/components/ui/command";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { cn, convertToSlug } from "@/lib/utils";
import { RiShoppingBag3Fill } from "react-icons/ri";
import { PiRankingFill } from "react-icons/pi";
import { RiDiscountPercentFill } from "react-icons/ri";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { HiUserGroup } from "react-icons/hi";
import { BiSolidTime } from "react-icons/bi";
import { FaListOl } from "react-icons/fa6";
import { MdOutlinePriceChange } from "react-icons/md";
import { MdMenuBook } from "react-icons/md";
import { IoMdMenu } from "react-icons/io";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { BsChatDots } from "react-icons/bs";
import Image from "next/image";

const navigate = [
  {
    gruop: "Kiểm duyệt",
    titles: [
      {
        title: "Sản phẩm",
        icon: <RiShoppingBag3Fill className="h-6 w-6 text-white" />,
      },
      {
        title: "Dịch vụ",
        icon: <RiShoppingBag3Fill className="h-6 w-6 text-white" />,
      },
      {
        title: "Bài viết",
        icon: <RiShoppingBag3Fill className="h-6 w-6 text-white" />,
      },
    ],
  },
  {
    gruop: "Chi tiêu",
    titles: [
      {
        title: "Thanh toán",
        icon: <MdMenuBook className="h-6 w-6 text-white" />,
      },
      {
        title: "Nạp tiền",
        icon: <MdOutlinePriceChange className="h-6 w-6 text-white" />,
      },
      {
        title: "Đơn hàng ",
        icon: <FaListOl className="h-6 w-6 text-white" />,
      },
    ],
  },
  {
    gruop: "Phản hồi",
    titles: [
      {
        title: "Khách hàng",
        icon: <MdMenuBook className="h-6 w-6 text-white" />,
      },
      {
        title: "Người bán",
        icon: <MdOutlinePriceChange className="h-6 w-6 text-white" />,
      },
    ],
  },
];
export default function SidebarAdmin(props) {
  const pathname = usePathname();
  function handleLogout() {
    toast("Đăng xuất thành công!");
  }
  return (
    <>
      <div className="fixed bottom-0 left-0 top-0 hidden min-w-60 max-w-60 rounded-r-sm border-r bg-primary/90 px-0 md:block">
        <>
          <Link href="/">
            <div className="flex items-center gap-x-2 border-b p-2">
              <div className="relative min-h-10 min-w-10">
                <Image
                  src="/icons/zaloapp.svg"
                  fill={true}
                  alt=""
                  className="rounded-full"
                />
              </div>
              <h5 className="animate-text flex-shrink-0 text-2xl font-semibold text-white">
                Tạp hóa zalo
              </h5>
            </div>
          </Link>
          <ul className="mt-4 list-none space-y-6 leading-3">
            {navigate.map((item, key) => (
              <div key={key} className="space-y-1">
                <p className="px-2 font-medium text-gray-300">{item.gruop}</p>
                {item.titles.map((row, index) => (
                  <li
                    key={index}
                    className={cn(
                      "px-2 py-1 text-white hover:bg-blue-700",
                      pathname ===
                        "/" +
                          convertToSlug(item.gruop) +
                          "/" +
                          convertToSlug(row.title)
                        ? "bg-blue-700"
                        : "",
                    )}
                  >
                    <Link
                      href={
                        "/" +
                        convertToSlug(item.gruop) +
                        "/" +
                        convertToSlug(row.title)
                      }
                      className="flex items-center gap-x-2 py-1"
                    >
                      {row?.icon}
                      <p className="font-medium">{row.title}</p>
                    </Link>
                  </li>
                ))}
              </div>
            ))}
          </ul>
        </>
      </div>
      <Sheet className="block md:hidden" key="left">
        <div className="card flex items-center justify-between rounded-none py-3 md:hidden">
          <SheetTrigger asChild>
            <IoMdMenu className="h-8 w-8" />
          </SheetTrigger>
          <div className="flex items-center gap-x-4">
            <BsChatDots className="h-6 w-6" />
            <div className="flex items-center gap-x-2">
              <img
                className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
              <h5>Hoàng vương</h5>
            </div>{" "}
            <Button className="px-2 py-0 text-sm" onClick={handleLogout}>
              Đăng xuất
            </Button>
          </div>
        </div>

        <SheetContent
          side="left"
          className="max-w-60 bg-primary px-0 md:max-w-60"
        >
          <Command className="bg-primary px-0">
            <CommandList className="max-h-full">
              <>
                <div className="relative flex min-h-10 min-w-10 border-b p-2">
                  <h5 className="flex-shrink-0 text-xl font-semibold text-white">
                    Tạp hóa zalo
                  </h5>
                </div>
                <ul className="mt-4 list-none space-y-6 leading-3">
                  {navigate.map((item, key) => (
                    <div key={key} className="px-2">
                      <p>{item.gruop}</p>
                      {item.titles.map((row, index) => (
                        <li
                          key={index}
                          className={cn(
                            "py-1 text-white hover:bg-blue-700",
                            pathname ===
                              "/" +
                                convertToSlug(item.gruop) +
                                "/" +
                                convertToSlug(row.title)
                              ? "bg-blue-700"
                              : "",
                          )}
                        >
                          <SheetClose asChild>
                            <Link
                              href={
                                "/" +
                                convertToSlug(item.gruop) +
                                "/" +
                                convertToSlug(row.title)
                              }
                              className="flex items-center gap-x-2 py-1"
                            >
                              {row?.icon}
                              <p className="font-medium">{row.title}</p>
                            </Link>
                          </SheetClose>
                        </li>
                      ))}
                    </div>
                  ))}
                </ul>
              </>
            </CommandList>
          </Command>
        </SheetContent>
      </Sheet>
    </>
  );
}
