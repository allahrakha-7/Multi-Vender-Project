import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
  currentOrder: null,
  cart: [],
  loading: false,
  error: null,
  newOrderCount: 0,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    fetchOrderStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchOrderSuccess: (state, action) => {
      state.loading = false;
      state.currentOrder = action.payload;
    },
    fetchOrderFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    placeOrderStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    placeOrderSuccess: (state, action) => {
      state.loading = false;
      state.currentOrder = action.payload;
      state.orders = [...state.orders, action.payload];
      state.cart = []; 
    },
    placeOrderFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.cart.find((cartItem) => cartItem.productId === item.productId);
      if (existingItem) {
        existingItem.quantity += item.quantity || 1;
      } else {
        state.cart.push({ ...item, quantity: item.quantity || 1 });
      }
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.cart = state.cart.filter((item) => item.productId !== productId);
    },
    clearCart: (state) => {
      state.cart = [];
    },
    updateOrderStatus: (state, action) => {
      const { orderId, status } = action.payload;
      const order = state.orders.find((o) => o._id === orderId);
      if (order) order.status = status;
    },
    clearNewOrderCount: (state) => {
      state.newOrderCount = 0;
    },
  },
});

export const {
  fetchOrderStart,
  fetchOrderSuccess,
  fetchOrderFailure,
  placeOrderStart,
  placeOrderSuccess,
  placeOrderFailure,
  addToCart,
  removeFromCart,
  clearCart,
  updateOrderStatus,
  clearNewOrderCount,
} = orderSlice.actions;

export default orderSlice.reducer;