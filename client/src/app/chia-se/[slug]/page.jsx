"use client";
import { Button, Input } from "@headlessui/react";
import { differenceInHours, parseISO } from "date-fns";
import { useEffect, useState } from "react";
import axios from "@/configs/api";
import { utcToZonedTime } from "date-fns-tz";
import { formatDatePost } from "@/lib/utils";
function formatDifferenceInHours(postedAt) {
  const now = new Date();
  const postedDate = parseISO(postedAt);
  const hoursSincePosted = differenceInHours(now, postedDate);
  return hoursSincePosted;
}
export default function SlugShare({ params }) {
  const { slug } = params;
  const [data, setData] = useState();
  useEffect(() => {
    fetch();
  }, [slug]);

  const fetch = async () => {
    try {
      const data = await axios.get("/post/" + slug);
      if (data.data.success === null) {
        setData({});
      }

      setData(data.data.msg);
    } catch (error) {
      console.log(error);
    }
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
                {/* - {formatDifferenceInHours(data.createdAt)} - */}
                {formatDatePost(data.createdAt)}
                {/* {new Date(data.createdAt).toLocaleDateString("vi-VN")} -<> </>
                {new Date(data.createdAt).toLocaleTimeString("vi-VN")} */}
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
            <Button className="rounded-lg bg-red-500 px-4 text-white hover:bg-red-500/80">
              Donate
            </Button>
          </div>
          <ul className="card list-none space-y-4">
            <li className="card-item">
              <p className="text-red-500">
                Hãy ủng hộ cho người viết bài bằng cách donate nếu nội dung hữu
                ích nhé !
              </p>
            </li>
            <li className="ml-0">
              <Button className="rounded-lg bg-red-500 px-4 py-1 text-xl text-white hover:bg-red-500/80">
                Donate
              </Button>
            </li>
            <li className="ml-0">
              <form className="space-y-4">
                <label htmlFor="comment" className="text-3xl font-medium">
                  Bình luận
                </label>
                <Input
                  className="min-w-full rounded-lg bg-gray-300/45 p-4"
                  placeholder="Comment here..."
                  id="comment"
                />
              </form>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
