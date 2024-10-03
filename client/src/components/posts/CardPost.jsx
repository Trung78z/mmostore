"use client";
import Image from "next/image";
import { cn, formatDatePost } from "@/lib/utils";
import { FaEye } from "react-icons/fa";
import { BiSolidLike } from "react-icons/bi";
import { IoIosChatbubbles } from "react-icons/io";
import Link from "next/link";
import { Button } from "@headlessui/react";
import { deletePostByUser } from "@/lib/features/posts/actions/postUserActions";
import { useAppDispatch } from "@/lib/reducer/hooks";
import { useRouter } from "next/navigation";
import axios from "@/configs/api";
import { useContext, useState } from "react";
import { AuthContext } from "@/lib/hooks/AuthProvider";
const truncateDescription = (description, maxLength) => {
  return description.length > maxLength
    ? description.substring(0, maxLength) + "..."
    : description;
};

export default function CardPost(props) {
  const { product, edit } = props;
  const { authState } = useContext(AuthContext);

  const [row, setRow] = useState(product);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const handleDeletePost = () => {
    dispatch(deletePostByUser(row.id));
  };
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
  const handleEditPost = () => {
    router.push("/user/quan-li-noi-dung/edit/" + row.id);
  };
  return (
    <div className="relative min-h-min rounded-lg bg-white pb-10 md:min-h-[375px] md:pb-0">
      <Link href={`/chia-se/` + row.slug} className="group">
        <div className="relative max-h-60 min-h-60 w-full overflow-hidden rounded-lg bg-gray-200 md:aspect-h-3 md:aspect-w-6 xl:aspect-h-4 xl:aspect-w-7 md:max-h-48 md:min-h-48">
          <Image
            src={
              row.image ||
              "https://taphoammo.net/img/post/tai-sao-nen-ban-hang-tren-instagram_396113.png"
            }
            alt={row.title}
            fill={true}
            className="h-full w-full object-cover object-center group-hover:opacity-75"
          />
        </div>
        <div className="mt-2 px-2">
          <h3 className="text-sm text-gray-700">
            <span className="text-primary hover:text-primary/80">
              {row.user.username} <> </>
            </span>
            - {formatDatePost(row.createdAt)}
          </h3>
          <h2 className="text-[16px] font-medium leading-6 text-gray-900">
            {truncateDescription(row.title, 60)}
          </h2>
        </div>
      </Link>
      <div className="mt-2 flex flex-col justify-between">
        <div
          className="inline-block px-2"
          dangerouslySetInnerHTML={{
            __html: truncateDescription(
              row.content
                .toLowerCase() // Chuyển tất cả về chữ thường trước
                .replace(
                  /(^|[.?!]\s+)([a-z])/g,
                  (match, separator, char) => separator + char.toUpperCase(),
                )
                .replace(/<strong>/g, "<p>")
                .replace(/<\/strong>/g, "</p>")
                .replace(/<h[1-6]>/g, "<p>")
                .replace(/<\/h[1-6]>/g, "</p>")
                .replace(/<li>/g, "<p>")
                .replace(/<\/li>/g, "</p>")
                .replace(/<ul>/g, "")
                .replace(/<\/ul>/g, "")
                .replace(/<ol>/g, "")
                .replace(/<\/ol>/g, "")
                .replace(/<br>/g, ""),
              110,
            ),
          }}
        />
        <ul className="absolute -bottom-4 flex list-none items-center gap-x-2 pl-2">
          <li className="ml-0 flex cursor-pointer items-center gap-x-1 p-0 text-sm text-gray-600 hover:text-primary">
            <FaEye /> <span>{row.postViews?.length || 1000} </span>
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
          <li className="ml-0 flex cursor-pointer items-center gap-x-1 text-sm text-gray-600 hover:text-primary">
            <IoIosChatbubbles />
            {row.chat || 100}
          </li>
        </ul>
      </div>
      {edit && (
        <div className="absolute right-2 top-2 flex items-center gap-x-2">
          <Button
            className="rounded-md bg-red-400 px-2 text-white hover:bg-red-500"
            onClick={handleDeletePost}
          >
            Delete
          </Button>
          <Button
            className="rounded-md bg-green-500 px-2 text-white hover:bg-green-600"
            onClick={handleEditPost}
          >
            Edit
          </Button>
        </div>
      )}
    </div>
  );
}
