"use client";

import { createContext, useContext, useEffect, useState } from "react";
import axios from "@/configs/api";
import { useAppDispatch, useAppSelector } from "@/lib/reducer/hooks";
import { selectPosts, selectStatus } from "@/lib/features/posts/postSlice";
import { fetchPosts } from "../features/posts/actions/postActions";
export const PostContext = createContext("");

export const usePost = () => {
  return useContext(PostContext);
};
function PostProvider({ children }) {
  const [dataContextPost, setDataContextPost] = useState([]);

  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectPosts);
  const status = useAppSelector(selectStatus);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);
  useEffect(() => {
    setDataContextPost(posts);
  }, [posts]);
  return (
    <PostContext.Provider value={{ dataContextPost, setDataContextPost }}>
      {children}
    </PostContext.Provider>
  );
}

export default PostProvider;
