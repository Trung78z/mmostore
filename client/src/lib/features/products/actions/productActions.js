import axios from "@/configs/api";
import {
  fetchProductsFailure,
  fetchProductsStart,
  fetchProductsSuccess,
} from "../productSlice";

const fetchData = async (id) => {
  const response = await axios.get("/products/" + id);
  return response.data;
};

export const fetchProducts = (id) => async (dispatch) => {
  dispatch(fetchProductsStart());

  try {
    const response = await fetchData(id);
    dispatch(fetchProductsSuccess(response.msg));
  } catch (error) {
    dispatch(fetchProductsFailure(error.message));
  }
};
