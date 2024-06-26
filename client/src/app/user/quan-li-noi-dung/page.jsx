"use client";
import { Button, Input, Select } from "@headlessui/react";
import { useRouter } from "next/navigation";
import React from "react";
import { IoSearch } from "react-icons/io5";

export default function QuanLiNoiDung() {
  const router = useRouter();
  const handleDirectTaoBai = () => {
    router.push("/user/quan-li-noi-dung/tao-bai-viet");
  };
  return (
    <div>
      <h1 className="text-3xl">Bài viết của bạn</h1>
      <div className="flex gap-x-2 pr-0 md:pr-80">
        <div className="relative flex-1">
          <Input
            className="min-w-full rounded-md border p-2"
            placeholder="Tìm bài viết..."
          ></Input>
          <div className="absolute right-2 top-0 translate-y-1/2">
            <IoSearch className="h-6 w-6 text-gray-400" />
          </div>
        </div>{" "}
        <Select className="block rounded-sm border p-2" name="country">
          <option>Tất cả</option>
          <option>Hoạt động</option>
          <option>Khóa</option>
          <option>Chờ duyệt</option>
        </Select>{" "}
        <Button
          className="rounded-md bg-green-500 px-4 py-2 text-white hover:border-primary/80"
          onClick={handleDirectTaoBai}
        >
          Tạo bài mới
        </Button>
      </div>
    </div>
  );
}
