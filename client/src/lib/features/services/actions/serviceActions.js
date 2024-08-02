import axios from "@/configs/api";
import {
  fetchServiceStart,
  fetchServiceSuccess,
  fetchServiceFailure,
} from "../serviceSlice";

const fetchData = async (id) => {
  const response = await axios.get("/services/" + id);
  return response.data;
};

export const fetchService = (id) => async (dispatch) => {
  dispatch(fetchServiceStart());

  try {
    const response = await fetchData(id);
    dispatch(fetchServiceSuccess(response.msg));
  } catch (error) {
    dispatch(fetchServiceFailure(error.message));
  }
};
