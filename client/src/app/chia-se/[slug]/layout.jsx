"use client";

import { subCategory } from "@/lib/data/post";
import React, { useEffect, useState, lazy, Suspense } from "react";
import axios from "@/configs/api";
import LoadingPage from "@/components/Loading";
const SidebarPost = lazy(() => import("@/components/posts/SidebarPost"));
export default function LayoutPost({ children }) {
  const [category, setCategory] = useState([]);
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
    <div className="mx-auto w-full max-w-screen-xl p-4">
      <div className="col-span-1 grid grid-flow-row md:grid-cols-4">
        <div className="col-span-3"> {children}</div>
        <div className="static top-0 col-span-1 hidden md:block">
          <Suspense
            fallback={
              <div className="flex min-h-screen items-center justify-center">
                <LoadingPage />
              </div>
            }
          >
            <SidebarPost subCategory={category} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
