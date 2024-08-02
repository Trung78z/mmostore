"use client";
import { AuthContext } from "@/lib/hooks/AuthProvider";
import { Button, Input } from "@headlessui/react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import axios from "@/configs/api";
import {
  formatDate,
  formatDatePost,
  formatTime,
  formatTimeChat,
} from "@/lib/utils";
import { format } from "date-fns";
export default function TrangCaNhan() {
  const { id } = useParams();
  const { authState } = useContext(AuthContext);
  const [item, setItem] = useState({});
  useEffect(() => {
    async function fetch() {
      try {
        const response = await axios.get(`/user/profile/${id}`);
        setItem(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetch();
  }, [id]);

  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
      <div className="col-span-1 md:col-span-2">
        <div className="card">
          <div className="mx-2 flex items-center justify-between gap-x-20 md:mx-20">
            <h3 className="text-xl font-medium text-primary">Level: 0</h3>
            <div className="flex flex-1 flex-col">
              <Input
                type="range"
                defaultValue={10}
                disabled
                className="flex-1 bg-slate-600"
              ></Input>
            </div>
          </div>
          <ul className="list-none space-y-3 px-2 md:px-20">
            <hr />
            <li className="ml-0 flex items-center justify-between px-2 font-semibold">
              <h6 className="text-center"> Tài khoản</h6>
              <h6 className="text-center">@{item.username}</h6>
            </li>
            <hr />
            <li className="ml-0 flex items-center justify-between px-2 font-semibold">
              <h6 className="text-center"> Họ tên</h6>
              <h6 className="text-center">{item.profiles?.fullName}</h6>
            </li>
            <hr />
            <li className="ml-0 flex items-center justify-between px-2 font-semibold">
              <h6 className="text-center">Số dư</h6>
              <h6 className="text-center">
                {(item.profiles?.accountBalance).toLocaleString("vi-VN") || 0}
                Vnđ
              </h6>
            </li>
            <hr />
            <li className="ml-0 flex items-center justify-between px-2 font-semibold">
              <h6 className="text-center"> Ngày đăng kí</h6>
              <h6 className="text-center">{formatDatePost(item.createdAt)}</h6>
            </li>
            <hr />
            <li className="ml-0 flex items-center justify-between px-2 font-semibold">
              <h6 className="text-center"> Số gian hàng</h6>
              <h6 className="text-center">{item._count?.services} Gian hàng</h6>
            </li>
            <hr />
            <li className="ml-0 flex items-center justify-between px-2 font-semibold">
              <h6 className="text-center"> Số bán</h6>
              <h6 className="text-center">{item._count?.orders} Sản phẩm</h6>
            </li>
            <hr />
            <li className="ml-0 flex items-center justify-between px-2 font-semibold">
              <h6 className="text-center"> Số bài viết</h6>
              <h6 className="text-center">{item._count?.posts} Bài viết</h6>
            </li>
            <hr />
            <li className="ml-0 flex items-center justify-between px-2 font-semibold">
              <h6 className="text-center">Mua bằng API </h6>
              <h6 className="flex gap-x-2 text-center">
                <span className="text-green-500"> Đang bật</span>
                <Input type="radio" defaultChecked={true}></Input>
              </h6>
            </li>
            <hr />
            <li className="ml-0 flex items-center justify-between px-2 font-semibold">
              <h6 className="text-center">Bảo mật 2 lớp</h6>
              <div className="flex flex-col items-end">
                <h6 className="flex items-center justify-end gap-x-2">
                  <span className="text-green-500"> Đang bật</span>
                  <Input type="radio" defaultChecked={true}></Input>
                </h6>
                <p className="text-center font-medium text-green-500">
                  (Hãy bảo mật tài khoản bằng mật khẩu 2 lớp!)
                </p>
              </div>
            </li>
            <hr />
            <li className="ml-0 flex items-center justify-between px-2 font-semibold">
              <h6 className="flex-shrink-0 text-center">Kết nối telegram</h6>
              <h6 className="flex flex-col gap-x-2 text-center">
                <div className="flex items-center justify-end gap-x-2">
                  <span className="text-red-500"> Chưa kết nối</span>
                  <Input
                    type="radio"
                    className="text-red-400 data-[checked]:text-red-500"
                  ></Input>
                </div>
                <p className="pl-10 text-end font-medium text-green-500">
                  (Bạn có thể gởi và nhận được tin nhắn mời (chưa xem) qua
                  Telegram nếu có kết nối)
                </p>
              </h6>
            </li>
            <hr />
            <li className="flex flex-1 items-center justify-center gap-x-2">
              <Button className="rounded-lg bg-green-500 px-4 py-2 text-white">
                Xem tất cả gian hàng
              </Button>
            </li>
          </ul>
        </div>
      </div>
      <div className="col-span-1 grid grid-cols-1 gap-2">
        <div className="card flex flex-col items-center justify-center">
          <div className="relative max-h-40 min-h-40 min-w-40 max-w-40">
            <Image
              src="https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745"
              alt=""
              className="rounded-full object-cover"
              fill={true}
            ></Image>
          </div>
          <h3>@{item.username}</h3>

          {item.status?.isOnline === true
            ? "Online"
            : `Online ${formatTimeChat(item.status?.lastOnline)} trước`}

          <Button className="rounded-lg bg-primary/80 px-4 py-2 text-xl text-white">
            Gian hàng
          </Button>
        </div>
      </div>
    </div>
  );
}
