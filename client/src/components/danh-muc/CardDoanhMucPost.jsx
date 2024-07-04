import React from "react";
import Image from "next/image";
import { FaEye } from "react-icons/fa";
import { IoIosChatbubbles } from "react-icons/io";
import { BiSolidLike } from "react-icons/bi";
import { formatContent } from "@/lib/utils";
import Link from "next/link";
export default function CardDoanhMucPost({ data }) {
  return (
    <div>
      <ul className="list-none">
        <li className="relative ml-0 min-h-40">
          <Image
            src={
              data.image ||
              "https://taphoammo.net/img/post/mo-xe-thuat-toan-cua-twitter-x_693559.png"
            }
            alt=""
            fill="true"
            className="rounded-md"
          />
        </li>
        <li className="ml-0">
          <Link href={"/chia-se/" + data.slug}>
            <h4 className="text-sm font-medium">
              {formatContent(data.title, 50)}
            </h4>
          </Link>
        </li>
        <li className="ml-0 font-medium text-primary">
          {data.user.username || "gianhangzalo"}
        </li>
        <li className="ml-0">
          <ul className="flex list-none gap-2">
            <li className="ml-0 flex items-center gap-x-1 text-sm text-gray-600">
              <FaEye /> <span>2k</span>
            </li>
            <li className="ml-0 flex items-center gap-x-1 text-sm text-gray-600">
              <BiSolidLike />0
            </li>
            <li className="ml-0 flex items-center gap-x-1 text-sm text-gray-600">
              <IoIosChatbubbles />0
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}
