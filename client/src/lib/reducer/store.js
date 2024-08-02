import {
  combineReducers,
  combineSlices,
  configureStore,
} from "@reduxjs/toolkit";

import { postSliceByUser } from "../features/posts/postUserSlice";
import { postSlice } from "../features/posts/postSlice";
import { productSlice } from "../features/products/productSlice";
import { serviceSlice } from "../features/services/serviceSlice";

const rootReducer = combineReducers({
  postsUser: postSliceByUser.reducer,
  posts: postSlice.reducer,
  products: productSlice.reducer,
  services: serviceSlice.reducer,
});
export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};
