import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartRedux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "cart",
  storage,
};

const persistedReducer = persistReducer(persistConfig, cartReducer);

export default configureStore({
  reducer: {
    cart: persistedReducer,
  },
});
