"use client";
import React, { useEffect, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useParams } from "next/navigation";
import CardPost from "@/components/posts/CardPost";
import {
  fetchPostsStart,
  fetchPostsSuccess,
  selectPosts,
  selectStatus,
} from "@/lib/features/posts/postSlice";
import { useAppDispatch, useAppSelector } from "@/lib/reducer/hooks";
import { useRouter } from "next/navigation";
import axios from "@/configs/api";
import { IoSearch } from "react-icons/io5";
import { Input } from "@headlessui/react";
import LoadingPage from "@/components/Loading";

export default function PostPage() {
  const { slug } = useParams();

  const dispatch = useAppDispatch();
  const [data, setData] = useState([]);

  const status = useAppSelector(selectStatus);
  const [category, setCategory] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      dispatch(fetchPostsStart());
      try {
        const response = await axios.get("/categories/postShares/" + slug);
        dispatch(fetchPostsSuccess(response.data.msg.posts));
      } catch (error) {
        dispatch(fetchPostsFailure(error.message));
      }
    };
    fetchPosts();
  }, [dispatch, slug]);
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get("/categories/postShares");
        setCategory(response.data.msg);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, []);
  const posts = useAppSelector(selectPosts);
  useEffect(() => {
    setData(posts);
  }, [posts]);

  const handleChangeSearch = (e) => {
    const filter = posts.filter((item) =>
      item.title.toLowerCase().includes(e.target.value.toLowerCase()),
    );
    setData(filter);
  };
  return (
    <>
      <div className="mx-auto w-full max-w-screen-xl pt-4">
        <div className="px-4">
          <h1>Kinh nghiệm MMO</h1>
          <p>
            Nơi chia sẻ kiến thức, kinh nghiệm, và trải nghiệm về kiếm tiền
            online.
          </p>
        </div>
        <div className="col-span-1 grid grid-flow-row md:grid-cols-4">
          <div className="static top-0 col-span-1 hidden md:block">
            <div className="h-full w-full space-y-6 rounded-lg p-4">
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

              <div className="min-w-full rounded-lg bg-background p-2">
                <Link href="/quan-li-bai-viet" className="">
                  <h4>Quản lí bài viết</h4>
                </Link>
              </div>
              <div className="min-w-full rounded-lg bg-background p-4">
                <h5>Thể loại</h5>
                <ul className="mt-2 list-none">
                  {category.map((item) => (
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
          </div>{" "}
          <div className="col-span-3">
            {" "}
            <div className="space-y-4 p-4">
              {status === "loading" ? (
                <p>
                  <LoadingPage />
                </p>
              ) : status === "failed" ? (
                <p>Failed to fetch posts.</p>
              ) : (
                <section>
                  <div className="grid grid-cols-1 gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-4">
                    {data.map((product) => (
                      <div key={product.id}>
                        <CardPost product={product} />
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>{" "}
      </div>
    </>
  );
}

{
  /*
  <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-2 sm:px-6">
  <div className="flex flex-1 justify-between sm:hidden">
    <Link
      href="#"
      className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
    >
      Previous
    </Link>
    <Link
      href="#"
      className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
    >
      Next
    </Link>
  </div>
</div>
 <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Đang hiển thị <span className="font-medium">1</span> to
                <span className="font-medium">10</span> of
                <span className="font-medium">97</span> results
              </p>
            </div>
            <div>
              <nav
                className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                aria-label="Pagination"
              >
                <Link
                  href="#"
                  className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  <span className="sr-only">Previous</span>
                  <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                </Link>

                <Link
                  href="#"
                  aria-current="page"
                  className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  1
                </Link>
                <Link
                  href="#"
                  className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  2
                </Link>
                <Link
                  href="#"
                  className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
                >
                  3
                </Link>
                <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
                  ...
                </span>
                <Link
                  href="#"
                  className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
                >
                  8
                </Link>
                <Link
                  href="#"
                  className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  9
                </Link>
                <Link
                  href="#"
                  className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  10
                </Link>
                <Link
                  href="#"
                  className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  <span className="sr-only">Next</span>
                  <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                </Link>
              </nav>
            </div>
          </div> */
}
