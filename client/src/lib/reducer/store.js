import {
  combineReducers,
  combineSlices,
  configureStore,
} from "@reduxjs/toolkit";

import { postSliceByUser } from "../features/posts/postUserSlice";
import { postSlice } from "../features/posts/postSlice";
import { productSlice } from "../features/products/productSlice";

const rootReducer = combineReducers({
  postsUser: postSliceByUser.reducer,
  posts: postSlice.reducer,
  products: productSlice.reducer,
});
export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    // middleware: (getDefaultMiddleware) => {
    //   return getDefaultMiddleware().concat(quotesApiSlice.middleware);
    // },
  });
};
