import axios from "@/configs/api";
import {
  fetchPostsStartByUser,
  fetchPostsSuccessByUser,
  fetchPostsFailureByUser,
  deletePostByUser as deletePostAction,
} from "../postUserSlice";
import { toast } from "react-toastify";
import { createAsyncThunk } from "@reduxjs/toolkit";

const fetchData = async () => {
  const response = await axios.get("/post/user/posts", {
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
  });
  return response.data;
};

export const fetchPostsByUser = () => async (dispatch) => {
  dispatch(fetchPostsStartByUser());

  try {
    const response = await fetchData();

    dispatch(fetchPostsSuccessByUser(response.msg));
  } catch (error) {
    dispatch(fetchPostsFailureByUser(error.message));
  }
};

export const deletePostByUser = (postId) => async (dispatch) => {
  try {
    await axios.delete(`/post/${postId}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });

    dispatch(deletePostAction(postId));
    toast.success("Đã xóa bài viết thành công!");
  } catch (error) {
    console.error("Error deleting post:", error);
    toast.error("Đã có lỗi xảy ra vui lòng thử lại!");
  }
};

export const editPostAsyncByUser = createAsyncThunk(
  "posts/editPost",
  async ({ postId, formData }) => {
    try {
      const response = await axios.put(`/post/${postId}`, formData, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });

      return response.data.updatePost;
    } catch (error) {
      throw new Error("Failed to edit post.");
    }
  },
);
