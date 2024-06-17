/* eslint-disable @next/next/no-img-element */
"use client";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";

import Link from "next/link";

import Image from "next/image";
import HeaderBar from "./header";
import { usePathname } from "next/navigation";
const navigation = [
  { name: "Trang chủ", href: "/" },
  { name: "Sản phẩm", href: "/danh-muc" },
  { name: "Dịch vụ", href: "/dich-vu" },
  { name: "Liên hệ", href: "/lien-he" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export default function Navbar() {
  const pathname = usePathname();
  return (
    <>
      <HeaderBar />
      <div className="sticky top-0 z-50">
        <Disclosure as="nav" className="bg-primary">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-14 items-center justify-between">
                  <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                    {/* Mobile menu button*/}
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
                    <Link href="/" className="flex flex-shrink-0 items-center">
                      <div className="relative flex h-8 w-10 flex-shrink-0 items-center shadow-sm">
                        <Image
                          className=""
                          src="./icons/zaloapp.svg"
                          alt="Your Company"
                          fill="true"
                        />
                      </div>
                      <span className="text-lg font-medium text-[#f8f8f8]">
                        Tạp hóa zalo
                      </span>
                    </Link>
                    <div className="hidden sm:ml-6 sm:block">
                      <div className="flex space-x-4">
                        {navigation.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.href === pathname
                                ? "rounded-3xl bg-blue-800 text-white"
                                : "rounded-3xl text-white hover:bg-primary hover:text-white",
                              "rounded-md px-3 py-1 text-sm font-medium",
                            )}
                            aria-current={item.href ? "page" : undefined}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                    <button
                      type="button"
                      className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    <Menu as="div" className="relative ml-3">
                      <div>
                        <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">Open user menu</span>
                          <img
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
                        <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <MenuItem>
                            {({ focus }) => (
                              <Link
                                href="#"
                                className={classNames(
                                  focus ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700",
                                )}
                              >
                                Your Profile
                              </Link>
                            )}
                          </MenuItem>
                          <MenuItem>
                            {({ focus }) => (
                              <Link
                                href="#"
                                className={classNames(
                                  focus ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700",
                                )}
                              >
                                Settings
                              </Link>
                            )}
                          </MenuItem>
                          <MenuItem>
                            {({ focus }) => (
                              <Link
                                href="#"
                                className={classNames(
                                  focus ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700",
                                )}
                              >
                                Sign out
                              </Link>
                            )}
                          </MenuItem>
                        </MenuItems>
                      </Transition>
                    </Menu>
                  </div>
                </div>
              </div>
              <DisclosurePanel className="sm:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2">
                  {navigation.map((item) => (
                    <DisclosureButton
                      className="flex w-full flex-col items-start"
                      key={item.name}
                    >
                      <Link
                        href={item.href}
                        className={classNames(
                          item.href
                            ? "rounded-3xl bg-blue-800 text-white"
                            : "text-white hover:bg-primary hover:text-white",
                          "block w-full flex-1 rounded-md px-3 py-1 text-start text-sm font-medium",
                        )}
                        aria-current={item.href ? "page" : undefined}
                      >
                        {" "}
                        {item.name}
                      </Link>
                    </DisclosureButton>
                  ))}
                </div>
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
  );
}
