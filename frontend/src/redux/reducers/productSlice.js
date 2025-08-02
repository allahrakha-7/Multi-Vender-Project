import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    loading: false,
    error: null,
};

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        createProductStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        createProductSuccess: (state, action) => {
            const product = action.payload?.product || action.payload;
            if (product && typeof product === "object") {
                state.products.unshift(product);
            }
            state.loading = false;
        },
        createProductFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        fetchProductsStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchProductsSuccess: (state, action) => {
            const payload = action.payload;
            if (Array.isArray(payload)) {
                state.products = payload;
            } else if (Array.isArray(payload.products)) {
                state.products = payload.products;
            } else if (Array.isArray(payload.data?.products)) {
                state.products = payload.data.products;
            } else {
                state.products = [];
            }
            state.loading = false;
        },
        fetchProductsFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        deleteProductStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        deleteProductSuccess: (state, action) => {
            const productId = action.payload;
            state.products = state.products.filter((product) => product._id !== productId);
            state.loading = false;
        },
        deleteProductFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        fetchOtherUsersProductsStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchOtherUsersProductsSuccess: (state, action) => {
            const payload = action.payload;
            if (Array.isArray(payload)) {
                state.products = payload;
            } else if (Array.isArray(payload.products)) {
                state.products = payload.products;
            } else if (Array.isArray(payload.data?.products)) {
                state.products = payload.data.products;
            } else {
                state.products = [];
            }
            state.loading = false;
        },
        fetchOtherUsersProductsFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    createProductStart,
    createProductSuccess,
    createProductFailure,
    fetchProductsStart,
    fetchProductsSuccess,
    fetchProductsFailure,
    deleteProductStart,
    deleteProductSuccess,
    deleteProductFailure,
    fetchOtherUsersProductsStart,
    fetchOtherUsersProductsSuccess,
    fetchOtherUsersProductsFailure,
} = productSlice.actions;

export default productSlice.reducer;