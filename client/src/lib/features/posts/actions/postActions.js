import axios from "@/configs/api";
import {
  fetchPostsStart,
  fetchPostsSuccess,
  fetchPostsFailure,
} from "../postSlice";

const fetchData = async () => {
  const response = await axios.get("/posts");
  return response.data;
};

export const fetchPosts = () => async (dispatch) => {
  dispatch(fetchPostsStart());

  try {
    const response = await fetchData();

    dispatch(fetchPostsSuccess(response.msg));
  } catch (error) {
    dispatch(fetchPostsFailure(error.message));
  }
};

const fetchDataCategory = async () => {
  const response = await axios.get("/categories/postShares");
  return response.data;
};

export const fetchPostCategory = () => async (dispatch) => {
  dispatch(fetchPostsStart());

  try {
    const response = await fetchDataCategory();
    dispatch(fetchPostsSuccess(response.msg));
  } catch (error) {
    dispatch(fetchPostsFailure(error.message));
  }
};
