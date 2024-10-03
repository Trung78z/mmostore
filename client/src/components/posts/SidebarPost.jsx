"use client";
import { convertToSlug } from "@/lib/utils";
import { Input } from "@headlessui/react";
import Link from "next/link";

import { IoSearch } from "react-icons/io5";

export default function SidebarPost({ subCategory, setSearch, sub = false }) {
  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
  };
  return (
    <div className="h-full w-full space-y-6 rounded-lg p-4">
      {sub && (
        <div className="relative bg-background">
          <Input
            className="min-h-12 min-w-full max-w-full rounded-lg border-2 border-primary p-2 data-[checked]:border-primary/80 data-[focus]:border-primary/80"
            placeholder="Tìm kiếm bài viết..."
            onChange={handleChangeSearch}
          ></Input>
          <span className="absolute right-2 top-1/2 -translate-y-1/2">
            <IoSearch className="h-8 w-8 cursor-pointer text-primary/80 hover:text-primary" />
          </span>
        </div>
      )}

      <div className="min-w-full rounded-lg bg-background p-2">
        <Link href="/quan-li-bai-viet" className="">
          <h4>Quản lí bài viết</h4>
        </Link>
      </div>
      <div className="min-w-full rounded-lg bg-background p-4">
        <h5>Thể loại</h5>
        <ul className="mt-2 list-none">
          {subCategory.map((item) => (
            <li key={item.id} className="ml-2">
              <Link
                href={`/chia-se/the-loai/${item.slug}`}
                className="hover:text-primary/65"
              >
                {item.category} -
                <span className=""> ({item._count?.posts})</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
