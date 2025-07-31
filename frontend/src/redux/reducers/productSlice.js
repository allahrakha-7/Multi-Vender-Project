import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    products: [],
    loading: false,
    error: null,
}

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        createProductStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        createProductSuccess: (state, action) => {
            state.products.unshift(action.payload);
            state.loading = false;
        },
        createProductFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        fetchProductsStart: (state) => {
            state.loading = true;
        },
        fetchProductsSuccess: (state, action) => {
            state.products = action.payload;
            state.loading = false;
        },
        fetchProductsFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
})


export const { createProductStart, createProductSuccess, createProductFailure, fetchProductsStart, fetchProductsSuccess, fetchProductsFailure } = productSlice.actions;

export default productSlice.reducer;