import { createAppSlice } from "@/lib/reducer/createAppSlice";
import { editPostAsyncByUser } from "./actions/postUserActions";

const initialState = {
  posts: [],
  status: "idle",
  error: null,
};

export const postSliceByUser = createAppSlice({
  name: "postsUser",
  initialState,
  reducers: (create) => ({
    fetchPostsStartByUser: create.reducer((state) => {
      state.status = "loading";
    }),
    fetchPostsSuccessByUser: create.reducer((state, action) => {
      state.status = "idle";
      state.posts = action.payload;
    }),
    fetchPostsFailureByUser: create.reducer((state, action) => {
      state.status = "failed";
      state.error = action.payload;
    }),
    deletePostByUser: create.reducer((state, action) => {
      const postIdToDelete = action.payload;
      state.posts = state.posts.filter((post) => post.id !== postIdToDelete);
    }),
    // editPost: create.reducer((state, action) => {
    //   const editedPost = action.payload;
    //   state.posts = state.posts.map((post) =>
    //     post.id === editedPost.id ? editedPost : post,
    //   );
    // }),
  }),
  extraReducers: (builder) => {
    builder
      .addCase(editPostAsyncByUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editPostAsyncByUser.fulfilled, (state, action) => {
        state.status = "idle";
        const editedPost = action.payload;
        state.posts = state.posts.map((post) =>
          post.id === editedPost.id ? editedPost : post,
        );
      })
      .addCase(editPostAsyncByUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message; // Store error message
      });
  },
  selectors: {
    selectPostsByUser: (posts) => posts.posts,
    selectStatusByUser: (posts) => posts.status,
    selectErrorByUser: (posts) => posts.error,
  },
});

export const {
  fetchPostsStartByUser,
  fetchPostsSuccessByUser,
  fetchPostsFailureByUser,
  deletePostByUser,
  editPostByUser,
} = postSliceByUser.actions;
export const { selectPostsByUser, selectStatusByUser, selectErrorByUser } =
  postSliceByUser.selectors;
