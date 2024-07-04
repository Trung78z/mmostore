import {
  combineReducers,
  combineSlices,
  configureStore,
} from "@reduxjs/toolkit";
import { counterSlice } from "../features/zcountersssssssssssssssssssssssssssss/counterSlice";
import { postSliceByUser } from "../features/post/postUserSlice";
import { postSlice } from "../features/post/postSlice";

const rootReducer = combineReducers({
  counter: counterSlice.reducer,
  postsUser: postSliceByUser.reducer,
  posts: postSlice.reducer,
});
export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    // middleware: (getDefaultMiddleware) => {
    //   return getDefaultMiddleware().concat(quotesApiSlice.middleware);
    // },
  });
};
