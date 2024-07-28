import { createAppSlice } from "@/lib/reducer/createAppSlice";

const initialState = {
  posts: [],
  status: "idle",
  error: null,
};

export const postSlice = createAppSlice({
  name: "posts",
  initialState,
  reducers: (create) => ({
    fetchPostsStart: create.reducer((state) => {
      state.status = "loading";
    }),
    fetchPostsSuccess: create.reducer((state, action) => {
      state.status = "idle";
      state.posts = action.payload;
    }),
    fetchPostsFailure: create.reducer((state, action) => {
      state.status = "failed";
      state.error = action.payload;
    }),
    deletePost: create.reducer((state, action) => {
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

  selectors: {
    selectPosts: (posts) => posts.posts,
    selectStatus: (posts) => posts.status,
    selectError: (posts) => posts.error,
  },
});

export const {
  fetchPostsStart,
  fetchPostsSuccess,
  fetchPostsFailure,
  deletePost,
  editPost,
} = postSlice.actions;
export const { selectPosts, selectStatus, selectError } = postSlice.selectors;
