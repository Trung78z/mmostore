import { createAppSlice } from "@/lib/reducer/createAppSlice";

const initialState = {
  services: [],
  status: "idle",
  error: null,
};

export const serviceSlice = createAppSlice({
  name: "services",
  initialState,
  reducers: (create) => ({
    fetchServiceStart: create.reducer((state) => {
      state.status = "loading";
    }),
    fetchServiceSuccess: create.reducer((state, action) => {
      state.status = "idle";
      state.services = action.payload;
    }),
    fetchServiceFailure: create.reducer((state, action) => {
      state.status = "failed";
      state.error = action.payload;
    }),
    deleteService: create.reducer((state, action) => {
      const serviceIdToDelete = action.payload;
      state.services = state.services.filter(
        (services) => services.id !== serviceIdToDelete,
      );
    }),
  }),

  selectors: {
    selectService: (services) => services.services,
    selectServiceStatus: (services) => services.status,
    selectServiceError: (services) => services.error,
  },
});

export const {
  fetchServiceStart,
  fetchServiceSuccess,
  fetchServiceFailure,
  deleteService,
  editProduct,
} = serviceSlice.actions;
export const { selectService, selectServiceStatus, selectServiceError } =
  serviceSlice.selectors;
