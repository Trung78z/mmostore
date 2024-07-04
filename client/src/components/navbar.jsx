"use client";
import {
  Button,
  CloseButton,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
  useClose,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";

import Link from "next/link";

import HeaderBar from "./header";
import { usePathname, useRouter } from "next/navigation";
import Logo from "./Logo";
import { convertToSlug } from "@/lib/utils";
import Image from "next/image";
import { toast } from "react-toastify";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/lib/hooks/AuthProvider";
import axios from "@/configs/api";
const navigation = [
  { name: "Trang chủ", href: "/" },
  { name: "Sản phẩm", href: "/danh-muc/san-pham" },
  { name: "Dịch vụ", href: "/danh-muc/dich-vu" },
  { name: "Liên hệ", href: "/lien-he" },
  { name: "Chia sẻ", href: "/chia-se" },
  { name: "FAQs", href: "/faqs" },
  { name: "Nạp tiền", href: "/nap-tien" },
];
const user = [
  { name: "Trang cá nhân" },
  { name: "Đơn hàng đã mua" },
  { name: "Gian hàng yêu thích" },
  { name: "Lịch sử thanh toán" },
  { name: "Quản lí nội dung" },
  { name: "Đổi mật khẩu" },
  { name: "Quản lí cửa hàng" },
];
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { authState, setAuthState } = useContext(AuthContext);
  async function handleLogout() {
    try {
      const msg = await axios.post("/user/logout", null, {
        withCredentials: true,
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      });
      sessionStorage.removeItem("token");
      toast("Bạn đã đăng xuất thành công!", { autoClose: 700 });
      setAuthState({ status: false, id: null });
      pathname.startsWith("/user") && router.push("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {!pathname.startsWith("/quan-li-cua-hang") && (
        <>
          <HeaderBar />
          <div className="sticky top-0 z-50">
            <Disclosure as="nav" className="bg-primary">
              {({ open }) => (
                <>
                  <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-14 items-center justify-between">
                      <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <DisclosureButton className="relative items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                          <span className="absolute -inset-0.5" />
                          <span className="sr-only">Open main menu</span>
                          {open ? (
                            <XMarkIcon
                              className="block h-6 w-6"
                              aria-hidden="true"
                            />
                          ) : (
                            <Bars3Icon
                              className="block h-6 w-6"
                              aria-hidden="true"
                            />
                          )}
                        </DisclosureButton>
                      </div>
                      <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <Link
                          href="/"
                          className="flex flex-shrink-0 items-center"
                        >
                          <div className="relative mr-2 flex h-10 w-10 flex-shrink-0 animate-spin items-center rounded-full border-2 border-white">
                            <Logo />
                          </div>
                          <span className="animate-text text-xl font-medium text-[#f8f8f8]">
                            Tạp hóa zalo
                          </span>
                        </Link>
                        <div className="hidden items-center md:ml-6 md:flex">
                          <div className="flex space-x-4">
                            {navigation.map((item) => (
                              <Link
                                key={item.name}
                                href={item.href}
                                className={classNames(
                                  item.href === pathname
                                    ? "rounded-3xl bg-blue-800 text-white"
                                    : "rounded-3xl text-white hover:bg-primary hover:text-white",
                                  "flex-shrink-0 rounded-md px-1 py-1 text-sm font-medium md:px-3",
                                )}
                                aria-current={item.href ? "page" : undefined}
                              >
                                {item.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                      {authState.status ? (
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                          <div className="mr-2 hidden font-medium text-white lg:flex">
                            <h4>Số dư: {(2000).toLocaleString("vi-VN")}k</h4>
                          </div>
                          <button
                            type="button"
                            className="relative rounded-full bg-blue-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-400"
                          >
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">View notifications</span>
                            <BellIcon
                              className="h-6 w-6 text-white"
                              aria-hidden="true"
                            />
                            <span className="absolute left-0 top-0 flex min-h-5 min-w-5 translate-y-5 items-center justify-center rounded-full bg-white p-0 text-[12px] font-semibold text-red-500">
                              3
                            </span>
                          </button>

                          <Menu as="div" className="relative ml-3">
                            <div>
                              <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                <span className="absolute -inset-1.5" />
                                <span className="sr-only">Open user menu</span>
                                <Image
                                  width={8}
                                  height={8}
                                  className="h-8 w-8 rounded-full"
                                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                  alt=""
                                />
                              </MenuButton>
                            </div>
                            <Transition
                              enter="transition ease-out duration-100"
                              enterFrom="transform opacity-0 scale-95"
                              enterTo="transform opacity-100 scale-100"
                              leave="transition ease-in duration-75"
                              leaveFrom="transform opacity-100 scale-100"
                              leaveTo="transform opacity-0 scale-95"
                            >
                              <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-0 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="mr-2 block px-4 font-medium text-green-500 lg:hidden">
                                  <h5>
                                    Số dư: {(2000).toLocaleString("vi-VN")}k
                                  </h5>
                                </div>
                                {user.map((item, index) => (
                                  <MenuItem key={index}>
                                    {({ focus }) => (
                                      <Link
                                        href={
                                          item.name === "Quản lí cửa hàng"
                                            ? "/" +
                                              convertToSlug(item.name) +
                                              "/sales"
                                            : "/user/" +
                                              convertToSlug(item.name)
                                        }
                                        className={classNames(
                                          focus ? "bg-gray-100" : "",
                                          "relative block px-4 py-2 text-sm text-gray-700",
                                          (item.name === "Đăng xuất" ||
                                            item.name === "Quản lí cửa hàng") &&
                                            "border-t",
                                        )}
                                      >
                                        {item.name}
                                      </Link>
                                    )}
                                  </MenuItem>
                                ))}
                                <hr />
                                <Button
                                  className="w-full bg-blue-500 px-4 pb-1 pt-2 text-white"
                                  onClick={handleLogout}
                                >
                                  Đăng xuất
                                </Button>
                              </MenuItems>
                            </Transition>
                          </Menu>
                        </div>
                      ) : (
                        <Link
                          href="/dang-nhap"
                          className="bg-primary/80 px-2 py-1 text-xl font-semibold text-white"
                        >
                          Đăng nhập
                        </Link>
                      )}
                    </div>
                  </div>
                  <DisclosurePanel className="space-y-1 px-2 pb-3 pt-2 md:hidden">
                    {navigation.map((item) => (
                      <Link
                        href={item.href}
                        key={item.name}
                        className={classNames(
                          item.href
                            ? "rounded-3xl text-white"
                            : "text-white hover:bg-primary hover:text-white",
                          "flex w-full flex-1 flex-col items-start rounded-md border px-3 py-1 text-start text-sm font-medium hover:bg-blue-900/90",
                        )}
                        aria-current={item.href ? "page" : undefined}
                      >
                        <CloseButton className="min-h-full min-w-full text-start">
                          {item.name}
                        </CloseButton>
                      </Link>
                    ))}
                  </DisclosurePanel>
                </>
              )}
            </Disclosure>
            <div className="w-full overflow-hidden whitespace-nowrap bg-green-50 font-medium text-red-500 ring-1 ring-inset ring-green-600/20">
              <p className="animate-marquee align-middle">
                <span className="w-max rounded-md text-xs">
                  Thời gian hoạt động từ: 08:00-16:00
                </span>
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
}
