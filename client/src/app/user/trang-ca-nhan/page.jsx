"use client";
import { Button, Input } from "@headlessui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

export default function TrangCaNhan() {
  const router = useRouter();
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
              <p className="text-center text-red-500">
                Hãy mua/bán thêm 100.000đ để đạt level tiếp theo!
              </p>
            </div>
          </div>
          <ul className="list-none space-y-3 px-2 md:px-20">
            <hr />
            <li className="flex items-center justify-between px-2 font-semibold">
              <h6 className="text-center"> Tài khoản</h6>
              <h6 className="text-center">@hoangvuong15</h6>
            </li>
            <hr />
            <li className="flex items-center justify-between px-2 font-semibold">
              <h6 className="text-center"> Họ tên</h6>
              <h6 className="text-center">Hoàng Vương</h6>
            </li>
            <hr />
            <li className="flex items-center justify-between px-2 font-semibold">
              <h6 className="text-center">Số dư</h6>
              <h6 className="text-center">000k</h6>
            </li>
            <hr />
            <li className="flex items-center justify-between px-2 font-semibold">
              <h6 className="text-center"> Ngày đăng kí</h6>
              <h6 className="text-center">{new Date().toLocaleDateString()}</h6>
            </li>
            <hr />
            <li className="flex items-center justify-between px-2 font-semibold">
              <h6 className="text-center"> Số gian hàng</h6>
              <h6 className="text-center">0 Gian hàng</h6>
            </li>
            <hr />
            <li className="flex items-center justify-between px-2 font-semibold">
              <h6 className="text-center"> Số bán</h6>
              <h6 className="text-center">0 Sản phẩm</h6>
            </li>
            <hr />
            <li className="flex items-center justify-between px-2 font-semibold">
              <h6 className="text-center"> Số bài viết</h6>
              <h6 className="text-center">0 Bài viết</h6>
            </li>
            <hr />
            <li className="flex items-center justify-between px-2 font-semibold">
              <h6 className="text-center">Mua bằng API </h6>
              <h6 className="flex gap-x-2 text-center">
                <span className="text-green-500"> Đang bật</span>
                <Input type="radio" defaultChecked={true}></Input>
              </h6>
            </li>
            <hr />
            <li className="flex items-center justify-between px-2 font-semibold">
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
            <li className="flex items-center justify-between px-2 font-semibold">
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
              <Button className="rounded-lg bg-primary/90 px-4 py-2 text-white">
                Chỉnh Sửa
              </Button>
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
          <h3>@Hoàng Vương</h3>
          <p>Online</p>
          <Button className="rounded-lg bg-primary/80 px-4 py-2 text-xl text-white">
            Gian hàng
          </Button>
        </div>
        <div className="card flex flex-col items-center justify-center">
          <h3 className="text-xl text-primary">Lịch sử đăng nhập</h3>
          <ul className="flex list-none flex-col items-center">
            <p>----</p>
            <li className="flex flex-col items-center gap-1">
              <span className="rounded-md bg-primary/70 p-1 text-sm">
                {new Date().toISOString()}
              </span>
              <p className="rounded-md bg-yellow-500/70 p-1 text-sm">
                Devices: Chrome
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
