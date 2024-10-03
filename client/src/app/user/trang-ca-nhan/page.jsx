"use client";
import { AuthContext } from "@/lib/hooks/AuthProvider";
import { Button, Input } from "@headlessui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import axios from "@/configs/api";
import { cn, formatDate, formatDatePost, formatTime } from "@/lib/utils";
import { format } from "date-fns";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const schema = z.object({
  fullName: z
    .string()
    .min(5, { message: "Vui lòng nhập ít nhất 5 kí tự!" })
    .max(20, { message: "Vui lòng nhập nhiều nhất 20 kí tự!" }),
});

export default function TrangCaNhan() {
  const { authState } = useContext(AuthContext);
  const [item, setItem] = useState({});
  const [edit, setEdit] = useState(false);
  const [fullName, setFullName] = useState("");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: zodResolver(schema) });
  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    try {
      const response = await axios.get("/user/by/id", {
        headers: { Authorization: "Bearer " + sessionStorage.getItem("token") },
      });
      setFullName(response.data.profiles?.fullName);
      setItem(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeValue = (e) => {
    setFullName(e.target.value);
  };
  const handleChangeEdit = (e) => {
    e.preventDefault();
    setEdit((prev) => !prev);
  };
  const onSubmit = async (data) => {
    if (edit === false) {
      return setEdit(true);
    }

    if (data.fullName === item.profiles?.fullName) {
      return setEdit(false);
    }

    try {
      const res = await axios.put("/user/profile/user", data, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      });
      if (res.data.success === false) {
        return toast.error("Đã có lỗi xảy ra!");
      }
      setEdit(false);
      setItem((prevItem) => ({
        ...prevItem,
        profiles: {
          ...prevItem.profiles,
          fullName: data.fullName,
        },
      }));
      reset({ fullName: "" });

      toast.success("Cập nhật thành công");
    } catch (error) {
      console.log(error);
      setEdit(false);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
              <li className="ml-0 flex items-center justify-between px-2 font-semibold">
                <h6 className="text-center"> Tài khoản</h6>
                <h6 className="text-center">@{item.username}</h6>
              </li>
              <hr />
              <li className="ml-0 flex items-center justify-between px-2 font-semibold">
                <h6 className="text-center"> Họ tên</h6>
                <div>
                  <Input
                    className={cn(
                      `p-0 text-end font-medium`,
                      edit && "rounded-md border-2 border-red-500",
                    )}
                    disabled={!edit}
                    {...register("fullName")}
                    onChange={handleChangeValue}
                    value={fullName}
                  ></Input>
                  {errors.fullName && (
                    <p className="text-end font-normal text-red-600">
                      {errors.fullName.message}
                    </p>
                  )}
                </div>
              </li>
              <hr />
              <li className="ml-0 flex items-center justify-between px-2 font-semibold">
                <h6 className="text-center">Số dư</h6>
                <h6 className="text-center">
                  {(authState?.accountBalance).toLocaleString("vi-VN") || 0}
                  Vnđ
                </h6>
              </li>
              <hr />
              <li className="ml-0 flex items-center justify-between px-2 font-semibold">
                <h6 className="text-center"> Ngày đăng kí</h6>
                <h6 className="text-center">
                  {formatDatePost(item.createdAt)}
                </h6>
              </li>
              <hr />
              <li className="ml-0 flex items-center justify-between px-2 font-semibold">
                <h6 className="text-center"> Số gian hàng</h6>
                <h6 className="text-center">
                  {item._count?.services} Gian hàng
                </h6>
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
                {!edit ? (
                  <Button
                    className="rounded-lg bg-primary/90 px-4 py-2 text-white"
                    onClick={handleChangeEdit}
                  >
                    {"Chỉnh Sửa"}
                  </Button>
                ) : (
                  <Button
                    className="rounded-lg bg-primary/90 px-4 py-2 text-white"
                    type="submit"
                  >
                    {"Xác nhận"}
                  </Button>
                )}

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
            <p>{item.status?.isOnline === true ? "Online" : "Offline"}</p>
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
                  {new Date().toDateString()}
                </span>
                <p className="rounded-md bg-yellow-500/70 p-1 text-sm">
                  Devices: Chrome
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </form>
  );
}
