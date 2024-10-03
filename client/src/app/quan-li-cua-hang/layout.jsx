"use client";
import SidebarGiaoDich from "@/components/quan-li-cua-hang/Sidebar";
import React, { useContext } from "react";
import { IoMdMenu } from "react-icons/io";
import { BsChatDots } from "react-icons/bs";
import Image from "next/image";
import { AuthContext } from "@/lib/hooks/AuthProvider";
import { Button } from "@headlessui/react";
import axios from "@/configs/api";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import AuthCheck from "./Checkauth";
import Link from "next/link";
export default function GiaoDichLayout({ children }) {
  const { authState, setAuthState } = useContext(AuthContext);
  const router = useRouter();
  const handleLogout = async () => {
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
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <AuthCheck />
      <SidebarGiaoDich />
      <div className="ml-0 md:ml-60">
        <div className="card hidden items-center justify-between rounded-none py-3 md:flex">
          {/* <IoMdMenu className="h-8 w-8" /> */}
          <div></div>
          <div className="flex items-center gap-x-4">
            <Link href="/chat">
              <BsChatDots className="h-6 w-6" />
            </Link>
            <div className="flex items-center gap-x-2">
              <Image
                height={32}
                width={32}
                className="inline-block rounded-full ring-2 ring-white"
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
                alt=""
              />
              <h5>{authState.fullName}</h5>
              <Button
                className="rounded-md bg-blue-500 p-1 text-white hover:bg-blue-700"
                onClick={handleLogout}
              >
                Đăng xuất
              </Button>
            </div>
          </div>
        </div>
        {children}
      </div>{" "}
      {/* </AuthCheck> */}
    </>
  );
}
