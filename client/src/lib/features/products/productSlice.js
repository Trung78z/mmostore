import { createAppSlice } from "@/lib/reducer/createAppSlice";

const initialState = {
  products: [],
  status: "idle",
  error: null,
};

export const productSlice = createAppSlice({
  name: "products",
  initialState,
  reducers: (create) => ({
    fetchProductsStart: create.reducer((state) => {
      state.status = "loading";
    }),
    fetchProductsSuccess: create.reducer((state, action) => {
      state.status = "idle";
      state.products = action.payload;
    }),
    fetchProductsFailure: create.reducer((state, action) => {
      state.status = "failed";
      state.error = action.payload;
    }),
    deleteProduct: create.reducer((state, action) => {
      const productIdToDelete = action.payload;
      state.products = state.products.filter(
        (product) => product.id !== productIdToDelete,
      );
    }),
  }),

  selectors: {
    selectProducts: (products) => products.products,
    selectProductsStatus: (products) => products.status,
    selectProductsError: (products) => products.error,
  },
});

export const {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
  deleteProduct,
  editProduct,
} = productSlice.actions;
export const { selectProducts, selectProductsStatus, selectProductsError } =
  productSlice.selectors;
