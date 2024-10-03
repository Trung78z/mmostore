"use client";
import { Button, Input } from "@headlessui/react";
import { differenceInHours, parseISO } from "date-fns";
import { useContext, useEffect, useState } from "react";
import axios from "@/configs/api";
import { utcToZonedTime } from "date-fns-tz";
import { cn, formatDatePost } from "@/lib/utils";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IoIosSend } from "react-icons/io";
import { AuthContext } from "@/lib/hooks/AuthProvider";
import Image from "next/image";
import { toast } from "react-toastify";
import { MdDelete } from "react-icons/md";
function formatDifferenceInHours(postedAt) {
  const now = new Date();
  const postedDate = parseISO(postedAt);
  const hoursSincePosted = differenceInHours(now, postedDate);
  return hoursSincePosted;
}
const schema = z.object({
  content: z
    .string()
    .min(1, { message: "Vui lòng thêm content cho bình luận" })
    .max(191, { message: "Vui lòng nhập ít hơn 191 kí tự!" }),
});
export default function SlugShare({ params }) {
  const { slug } = params;
  const [data, setData] = useState();
  const [comment, setComment] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await axios.get("/posts/" + slug);

        if (data.data.success === null) {
          setData({});
        }
        setComment(data.data.msg.postPomments);
        viewPost(data.data.msg.id);
        setData(data.data.msg);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, [slug]);
  const { authState } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });
  const viewPost = async (postId) => {
    try {
      const res = await axios.post(
        "/posts/view-post",
        { postId: postId },
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        },
      );
    } catch (error) {}
  };
  const onSubmit = async (value) => {
    const dataz = { ...value, postId: data.id };
    try {
      const res = await axios.post("/posts/comment", dataz, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      });
      setComment([res.data.msg, ...comment]);
      reset();
    } catch (error) {}
  };
  return (
    <>
      {data && (
        <div className="space-y-4">
          <div className="rounded-lg bg-background p-4">
            <h1 className="text-2xl">{data.title}</h1>
            <div className="mt-2">
              <h3 className="text-sm text-gray-700">
                <span className="text-primary hover:text-primary/80">
                  {data.user.username} <> </>
                </span>

                {formatDatePost(data.createdAt)}
              </h3>
            </div>
          </div>
          <div
            className="mt-4 space-y-4 rounded-lg bg-background p-4"
            dangerouslySetInnerHTML={{ __html: data.content }}
          />
          <div className="flex items-center justify-center gap-1 md:justify-end">
            <Button className="rounded-lg bg-green-500 px-4 text-white hover:bg-green-500/80">
              Share
            </Button>
            <Button className="rounded-lg bg-blue-500 px-4 text-white hover:bg-blue-500/80">
              Like
            </Button>
          </div>
          <ul className="card list-none space-y-4">
            <li className="ml-0"></li>
            <li className="ml-0">
              <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="comment" className="text-3xl font-medium">
                  Bình luận
                </label>
                <div className="relative">
                  <Input
                    className="min-w-full rounded-lg bg-gray-300/45 p-4"
                    placeholder="Comment here..."
                    id="comment"
                    {...register("content")}
                  />
                  {errors.content && (
                    <p className="text-red-600">{errors.content.message}</p>
                  )}
                  <button
                    type="submit"
                    className="absolute bottom-2 right-2"
                    disabled={authState.status === false ? true : false}
                  >
                    <IoIosSend
                      className={cn(
                        "h-6 w-6",
                        authState.status === false
                          ? "text-gray-400"
                          : "text-gray-600",
                      )}
                    />
                  </button>
                </div>
              </form>
            </li>
            <div className="space-y-3">
              {comment?.map((item) => (
                <CardComment
                  data={item}
                  setComment={setComment}
                  key={item?.id}
                />
              ))}
            </div>
          </ul>
        </div>
      )}
    </>
  );
}

const CardComment = ({ data, setComment }) => {
  const { authState } = useContext(AuthContext);
  const handleDelete = async () => {
    try {
      try {
        const res = await axios.delete(`/posts/comment/${data.id}`, {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        });
        setComment((prevComments) =>
          prevComments.filter((comment) => comment.id !== data.id),
        );
      } catch (error) {}
    } catch (error) {}
  };
  return (
    <>
      <div className="relative flex items-center gap-2">
        <Image
          src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          width={44}
          height={44}
          alt={data?.user?.profiles?.fullName || "Ẩn danh"}
          className="h-11 w-11 rounded-full"
        />
        {data.userId === authState.id && (
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 text-red-500"
            onClick={handleDelete}
          >
            <MdDelete />
          </button>
        )}
        <div>
          <h5> {data?.user?.profiles?.fullName || "Ẩn danh"}</h5>
          <p>{data?.content}</p>
        </div>
      </div>
    </>
  );
};
