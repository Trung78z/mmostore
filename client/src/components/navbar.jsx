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

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { RiArrowDropUpFill } from "react-icons/ri";
import Link from "next/link";

import HeaderBar from "./header";
import { usePathname, useRouter } from "next/navigation";
import Logo from "./Logo";
import { cn, convertToSlug } from "@/lib/utils";
import Image from "next/image";
import { toast } from "react-toastify";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/lib/hooks/AuthProvider";
import axios from "@/configs/api";
import { navigation } from "@/lib/data/nav";
import { ChevronDownIcon } from "lucide-react";
import { BsChatDots } from "react-icons/bs";
import Swal from "sweetalert2";

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
      setAuthState({
        status: false,
        id: null,
        role: "",
        accountBalance: 0,
        fullName: "",
      });
      pathname.startsWith("/user") ||
        (pathname.startsWith("/quan-li-cua-hang") && router.push("/"));
    } catch (error) {
      console.log(error);
    }
  }
  const [isHovered, setIsHovered] = useState(false);
  const handleClickSell = () => {
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
  const handleMouseEnter = (e) => {
    e.preventDefault();
    setIsHovered(true);
  };

  const handleMouseLeave = (e) => {
    e.preventDefault();
    setIsHovered(false);
  };
  return (
    <>
      {!pathname.startsWith("/quan-li-cua-hang") && (
        <>
          <HeaderBar />
          <div className="sticky top-0 z-50">
            <Disclosure as="nav" className="bg-primary">
              {({ open }) => (
                <>
                  <Sheet key="left">
                    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                      <div className="relative flex h-14 items-center justify-between">
                        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                          <SheetTrigger className="relative items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
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
                          </SheetTrigger>
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
                            <div className="flex space-x-3">
                              {navigation.map((item) => (
                                <div key={item.name} className="flex-shrink-0">
                                  {item.href === "/danh-muc/dich-vu" ||
                                  item.href === "/danh-muc/san-pham" ? (
                                    <HoverCard openDelay={300} closeDelay={200}>
                                      <HoverCardTrigger
                                        className={classNames(
                                          pathname.includes(item.href)
                                            ? "rounded-3xl bg-blue-800 text-white"
                                            : "rounded-3xl text-white hover:bg-primary hover:text-white",
                                          "relative flex flex-shrink-0 cursor-pointer items-center rounded-md px-1 py-1 text-sm font-medium md:px-4",
                                        )}
                                        onMouseEnter={handleMouseEnter}
                                        onMouseLeave={handleMouseLeave}
                                        data-state={
                                          isHovered ? "open" : "closed"
                                        }
                                      >
                                        {item.name}
                                        <RiArrowDropUpFill
                                          className={cn(
                                            "absolute right-0 h-6 w-6 translate-x-1 transition-all",
                                            isHovered && item.href
                                              ? "rotate-180"
                                              : "rotate-0",
                                          )}
                                        />
                                      </HoverCardTrigger>
                                      <HoverCardContent className="grid w-max grid-cols-2 items-center justify-center gap-2">
                                        {item.data.map((row) => (
                                          <Link href={row.href} key={row.href}>
                                            {row.subCategory}
                                          </Link>
                                        ))}
                                      </HoverCardContent>
                                    </HoverCard>
                                  ) : (
                                    <Link
                                      href={item.href}
                                      className={classNames(
                                        item.href === pathname
                                          ? "rounded-3xl bg-blue-800 text-white"
                                          : "rounded-3xl text-white hover:bg-primary hover:text-white",
                                        "flex flex-shrink-0 items-center rounded-md px-1 py-1 text-sm font-medium md:px-3",
                                        item.href === "/nap-tien" &&
                                          !authState.status &&
                                          "hidden",
                                      )}
                                      aria-current={
                                        item.href ? "page" : undefined
                                      }
                                    >
                                      {item.name}
                                    </Link>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {authState.status ? (
                          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            {authState.role === "USER" && (
                              <h4
                                className="mr-2 hidden cursor-pointer font-medium text-red-500 lg:flex"
                                onClick={handleClickSell}
                              >
                                Bán hàng
                              </h4>
                            )}

                            <div className="mr-2 hidden font-medium text-white lg:flex">
                              <h4>
                                Số dư:<> </>
                                {authState.accountBalance.toLocaleString(
                                  "vi-VN",
                                ) || 0}
                                Vnđ
                              </h4>
                            </div>
                            <Link href="/chat">
                              <BsChatDots className="h-6 w-6 text-white" />
                            </Link>
                            {/* <button
                              type="button"
                              className="relative rounded-full bg-blue-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-400"
                            >
                              <span className="absolute -inset-1.5" />
                              <span className="sr-only">
                                View notifications
                              </span>
                              <BellIcon
                                className="h-6 w-6 text-white"
                                aria-hidden="true"
                              />
                              <span className="absolute left-0 top-0 flex min-h-5 min-w-5 translate-y-5 items-center justify-center rounded-full bg-white p-0 text-[12px] font-semibold text-red-500">
                                3
                              </span>
                            </button> */}

                            <Menu as="div" className="relative ml-3">
                              <div>
                                <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                  <span className="absolute -inset-1.5" />
                                  <span className="sr-only">
                                    Open user menu
                                  </span>
                                  <Image
                                    width={8}
                                    height={8}
                                    className="h-8 w-8 rounded-full"
                                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
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
                                <MenuItems className="absolute right-0 z-10 mt-2 w-52 origin-top-right rounded-md bg-white py-0 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                  <div className="block px-2 font-medium text-green-500 lg:hidden">
                                    <h5>
                                      Số dư: <> </>
                                      {authState.accountBalance.toLocaleString(
                                        "vi-VN",
                                      ) || 0}
                                      Vnđ
                                    </h5>
                                  </div>{" "}
                                  {authState.role === "USER" && (
                                    <div
                                      className="block cursor-pointer px-2 font-medium text-red-500 lg:hidden"
                                      onClick={handleClickSell}
                                    >
                                      <h5>Đăng kí bán hàng</h5>
                                    </div>
                                  )}
                                  <hr />
                                  {user
                                    .filter(
                                      (item) =>
                                        !(
                                          authState.role === "USER" &&
                                          item.name === "Quản lí cửa hàng"
                                        ),
                                    )
                                    .map((item, index) => (
                                      <MenuItem key={index}>
                                        {({ focus }) => (
                                          <Link
                                            href={
                                              item.name === "Quản lí cửa hàng"
                                                ? "/" +
                                                  convertToSlug(item.name) +
                                                  "/quan-li-gian-hang"
                                                : "/user/" +
                                                  convertToSlug(item.name)
                                            }
                                            className={classNames(
                                              focus ? "bg-gray-100" : "",
                                              "relative block px-4 py-2 text-sm text-gray-700",
                                              (item.name === "Đăng xuất" ||
                                                item.name ===
                                                  "Quản lí cửa hàng") &&
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
                    {/* <DisclosurePanel className="space-y-1 px-2 pb-3 pt-2 md:hidden">
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
                  </DisclosurePanel> */}

                    <SheetContent
                      side="left"
                      className="max-w-60 bg-primary px-0"
                    >
                      <SheetHeader className="px-0">
                        <SheetTitle className="flex justify-center">
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
                        </SheetTitle>
                        <SheetDescription className="space-y-2">
                          {navigation.map((item) => (
                            <div key={item.href}>
                              {item.href === "/danh-muc/dich-vu" ||
                              item.href === "/danh-muc/san-pham" ? (
                                <Disclosure
                                  as="div"
                                  className={classNames(
                                    item.href === pathname
                                      ? "text-white"
                                      : "text-white hover:bg-primary hover:text-white",
                                    "flex w-full flex-1 flex-col items-start border-b py-1 text-start text-sm font-medium hover:bg-blue-900/90",
                                  )}
                                >
                                  <DisclosureButton className="flex w-full items-center justify-between px-3">
                                    <span className="text-sm/6 font-medium text-white group-data-[hover]:text-white/80">
                                      {item.name}
                                    </span>
                                    <ChevronDownIcon className="size-5 fill-white/60 group-data-[open]:rotate-180 group-data-[hover]:fill-white/50" />
                                  </DisclosureButton>
                                  <DisclosurePanel className="mt-2 grid w-full grid-cols-2 gap-2 bg-blue-700 px-3">
                                    {item.data.map((row) => (
                                      <Link href={row.href} key={row.href}>
                                        <SheetTrigger className="min-h-full min-w-full text-start">
                                          {row.subCategory}
                                        </SheetTrigger>
                                      </Link>
                                    ))}
                                  </DisclosurePanel>
                                </Disclosure>
                              ) : (
                                <Link
                                  href={item.href}
                                  className={classNames(
                                    item.href === pathname
                                      ? "text-white"
                                      : "text-white hover:bg-primary hover:text-white",
                                    "flex w-full flex-1 flex-col items-start border-b px-3 py-1 text-start text-sm font-medium hover:bg-blue-900/90",
                                  )}
                                  aria-current={item.href ? "page" : undefined}
                                >
                                  <SheetTrigger className="min-h-full min-w-full text-start">
                                    {item.name}
                                  </SheetTrigger>
                                </Link>
                              )}
                            </div>
                          ))}
                        </SheetDescription>
                      </SheetHeader>
                    </SheetContent>
                  </Sheet>
                </>
              )}
            </Disclosure>
            <div className="w-full overflow-hidden whitespace-nowrap bg-green-50 font-medium text-red-500 ring-1 ring-inset ring-green-600/20">
              <p className="animate-marquee align-middle">
                <span className="w-max rounded-md text-xs">
                  Tạp Hóa MMO - Sàn thương mại điện tử sản phẩm số phục vụ Kiếm
                  tiền online. Mọi giao dịch trên trang đều hoàn toàn tự động và
                  được giữ tiền 3 ngày, thay thế cho hình thức trung gian, các
                  bạn yên tâm giao dịch nhé. (2) Cảnh báo gian hàng không uy
                  tín: Nếu chủ shop bán cho bạn sản phẩm không đúng định dạng:
                  tài-khoản|mật-khẩu..., mà là 1 chuỗi không liên quan ở đầu, có
                  nghĩa là hàng đó đang cố pass hệ thống check trùng của sàn,
                  hãy nhanh chóng khiếu nại đơn hàng và báo cho bên mình nhé, vì
                  sản phẩm bạn mua có thể đã từng bán cho người khác trên sàn.
                </span>
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
}
