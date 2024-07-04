"use client";
import { Button, Input, Select } from "@headlessui/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { IoSearch } from "react-icons/io5";
import CardPost from "@/components/posts/CardPost";

import { useAppDispatch, useAppSelector } from "@/lib/reducer/hooks";
import {
  selectStatusByUser,
  selectPostsByUser,
} from "@/lib/features/post/postUserSlice";
import { fetchPostsByUser } from "@/lib/features/post/actions/postUserActions";

export default function QuanLiNoiDung() {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectPostsByUser);
  const status = useAppSelector(selectStatusByUser);
  const router = useRouter();

  useEffect(() => {
    dispatch(fetchPostsByUser());
  }, [dispatch]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "failed") {
    return <p>Failed to fetch posts.</p>;
  }

  const handleDirectTaoBai = () => {
    router.push("/user/quan-li-noi-dung/tao-bai-viet");
  };
  return (
    <>
      <div className="space-y-6">
        <h1 className="text-3xl">Bài viết của bạn</h1>
        <div className="flex flex-wrap gap-x-2 pr-0 md:pr-80">
          <div className="relative flex-1">
            <Input
              className="min-w-full rounded-md border p-2"
              placeholder="Tìm bài viết..."
            ></Input>
            <div className="absolute right-2 top-0 translate-y-1/2">
              <IoSearch className="h-6 w-6 text-gray-400" />
            </div>
          </div>
          <Select className="block rounded-sm border p-2" name="country">
            <option>Tất cả</option>
            <option>Hoạt động</option>
            <option>Khóa</option>
            <option>Chờ duyệt</option>
          </Select>
          <Button
            className="flex-shrink-0 rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600"
            onClick={handleDirectTaoBai}
          >
            Tạo bài mới
          </Button>
        </div>{" "}
        <div className="grid h-full w-full grid-cols-1 gap-x-4 gap-y-10 p-4 sm:grid-cols-2 md:p-10 lg:grid-cols-4 xl:gap-x-4">
          {posts.length > 0 ? (
            posts.map((product) => (
              <div key={product.id}>
                <CardPost product={product} edit={true} />
              </div>
            ))
          ) : (
            <div>
              <h5 className="text-lg font-medium text-green-500">
                Bạn chưa có bài viết nào.
              </h5>
              <p>Hãy nhấn vào tạo bài biết để viết bài nhé!</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
