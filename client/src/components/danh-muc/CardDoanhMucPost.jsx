import React, { useContext, useState } from "react";
import Image from "next/image";
import { FaEye } from "react-icons/fa";
import { IoIosChatbubbles } from "react-icons/io";
import { BiSolidLike } from "react-icons/bi";
import { cn, formatContent } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@headlessui/react";
import { AuthContext } from "@/lib/hooks/AuthProvider";
import axios from "@/configs/api";
export default function CardDoanhMucPost({ data }) {
  const [row, setRow] = useState(data);

  const { authState } = useContext(AuthContext);
  const handleLikePost = async () => {
    try {
      const response = await axios.post(
        "/posts/like-post",
        { postId: row.id },
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        },
      );

      const updatedMsg = response.data.msg;

      const isExisting = row.postLikes?.some(
        (item) => item.id === updatedMsg.id,
      );

      let updatedPostLikes;
      if (isExisting) {
        updatedPostLikes = row.postLikes.filter(
          (item) => item.id !== updatedMsg.id,
        );
      } else {
        updatedPostLikes = [...row.postLikes, updatedMsg];
      }
      setRow({ ...row, postLikes: updatedPostLikes });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <ul className="list-none">
        <li className="relative ml-0 min-h-40">
          <Image
            src={
              row.image ||
              "https://taphoammo.net/img/post/mo-xe-thuat-toan-cua-twitter-x_693559.png"
            }
            alt=""
            fill="true"
            className="rounded-md"
          />
        </li>
        <li className="ml-0">
          <Link href={"/chia-se/" + row.slug}>
            <h4 className="text-sm font-medium">
              {formatContent(row.title, 50)}
            </h4>
          </Link>
        </li>
        <li className="ml-0 font-medium text-primary">
          {row.user.username || "gianhangzalo"}
        </li>
        <li className="ml-0">
          <ul className="flex list-none gap-2">
            <li className="ml-0 flex items-center gap-x-1 text-sm text-gray-600">
              <FaEye /> <span>{row.postViews?.length} </span>
            </li>
            <li className="ml-0">
              <Button
                className={cn(
                  "flex cursor-pointer items-center gap-x-1 text-sm hover:text-primary",
                  {
                    "text-blue-600": row.postLikes?.some(
                      (item) => item.userId === authState.id,
                    ),
                    "text-gray-600": !row.postLikes?.some(
                      (item) => item.userId === authState.id,
                    ),
                  },
                )}
                onClick={handleLikePost}
              >
                <BiSolidLike />
                <span> {row.postLikes?.length || 1000}</span>
              </Button>
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
