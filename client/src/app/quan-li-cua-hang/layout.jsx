"use client";
import SidebarGiaoDich from "@/components/quan-li-cua-hang/Sidebar";
import React, { useContext } from "react";
import { IoMdMenu } from "react-icons/io";
import { BsChatDots } from "react-icons/bs";
import Image from "next/image";
import { AuthContext } from "@/lib/hooks/AuthProvider";
export default function GiaoDichLayout({ children }) {
  const { authState } = useContext(AuthContext);
  return (
    <>
      <SidebarGiaoDich />
      <div className="ml-0 md:ml-60">
        <div className="card hidden items-center justify-between rounded-none py-3 md:flex">
          <IoMdMenu className="h-8 w-8" />
          <div className="flex items-center gap-x-4">
            <BsChatDots className="h-6 w-6" />
            <div className="flex items-center gap-x-2">
              <Image
                height={32}
                width={32}
                className="inline-block rounded-full ring-2 ring-white"
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
                alt=""
              />
              <h5>
                {authState.firstName} <span>{authState.lastName}</span>{" "}
              </h5>
            </div>
          </div>
        </div>
        {children}
      </div>
    </>
  );
}
