import axios from "@/configs/api";
import {
  fetchPostsStart,
  fetchPostsSuccess,
  fetchPostsFailure,
} from "../postSlice";

const fetchData = async () => {
  const response = await axios.get("/post");
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
