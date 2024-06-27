import { products } from "@/lib/placeholder";
import { Button, Input } from "@headlessui/react";
import React from "react";

export default function SlugShare() {
  return (
    <>
      {products.slice(0, 1).map((item, key) => (
        <div key={key} className="space-y-4">
          <div className="rounded-lg bg-background p-4">
            <h1 className="text-2xl">{item.name}</h1>
            <div className="mt-2">
              <h3 className="text-sm text-gray-700">
                <span className="text-primary hover:text-primary/80">
                  {item.user} <> </>
                </span>
                - {item.dateUpdate}
              </h3>
            </div>
          </div>
          <div
            className="mt-4 space-y-4 rounded-lg bg-background p-4"
            dangerouslySetInnerHTML={{ __html: item.description }}
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
            <li>
              <Button className="rounded-lg bg-red-500 px-4 py-1 text-xl text-white hover:bg-red-500/80">
                Donate
              </Button>
            </li>
            <li>
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
      ))}
    </>
  );
}
