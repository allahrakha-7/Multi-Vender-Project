import { configureStore, combineReducers} from "@reduxjs/toolkit";
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from "./reducers/userSlice.js";
import productReducer from './reducers/productSlice.js';
import cartReducer from './reducers/cartSlice.js';
import orderReducer from './reducers/orderSlice.js';

const rootReducer = combineReducers({
  user: userReducer,
  product: productReducer,
  cart: cartReducer,
  order: orderReducer,
})

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware ({ serializableCheck: false }),
});



export const persistor = persistStore(store);