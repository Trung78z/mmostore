"use client";

import React, { lazy, useEffect, useState, Suspense } from "react";
import axios from "@/configs/api";
import { usePost } from "@/lib/hooks/ContextPost";
import { fetchPosts } from "@/lib/features/posts/actions/postActions";
import { useAppDispatch, useAppSelector } from "@/lib/reducer/hooks";
import { selectPosts } from "@/lib/features/posts/postSlice";
import LoadingPage from "@/components/Loading";

const SidebarPost = lazy(() => import("@/components/posts/SidebarPost"));
export default function LayoutPost({ children }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState([]);
  const { dataContextPost, setDataContextPost } = usePost();
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectPosts);
  useEffect(() => {
    const filter = posts.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase()),
    );
    setDataContextPost(filter);
  }, [search, posts, setDataContextPost]);
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  useEffect(() => {
    fetch();
  }, []);
  const fetch = async () => {
    try {
      const response = await axios.get("/categories/postShares");
      setCategory(response.data.msg);
    } catch (error) {
      console.log(error);
    }
  };

  return (
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
          <Suspense
            fallback={
              <div className="flex min-h-40 items-center justify-center">
                <LoadingPage />
              </div>
            }
          >
            <SidebarPost
              subCategory={category}
              setSearch={setSearch}
              sub={true}
            />
          </Suspense>
        </div>
        <div className="col-span-3"> {children}</div>
      </div>
    </div>
  );
}
