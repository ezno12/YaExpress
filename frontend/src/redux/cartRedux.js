import { createSlice } from "@reduxjs/toolkit";
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    wishlist: [],
    products: [],
    quantity: 0,
    totalPrice: 0,
    promoPrice: 0,
  },
  reducers: {
    userCart: (state, action) => {
      state.products = action.payload.products;
      state.wishlist = action.payload.wishList;
      state.quantity = action.payload.quantity;
    },
    addProduct: (state, action) => {
      const index = state.products.findIndex(
        (prod) => prod.title === action.payload.title
      );
      if (0 <= index) {
        state.products[index].quantity += action.payload.quantity;
        state.totalPrice +=
          (action.payload.price - action.payload.remise) *
          action.payload.quantity;
        state.promoPrice = 0;
      } else {
        state.quantity += 1;
        state.products.push(action.payload);
        state.totalPrice +=
          (action.payload.price - action.payload.remise) *
          action.payload.quantity;
        state.promoPrice = 0;
      }
    },
    deleteProduct: (state, action) => {
      const index = state.products.findIndex(
        (prod) => prod.title === action.payload.title
      );
      state.quantity -= 1;
      state.totalPrice -=
        (state.products[index].price - state.products[index].remise) *
        state.products[index].quantity;
      state.promoPrice = 0;
      state.products.splice(index, 1);
    },
    minusQuantity: (state, action) => {
      const index = state.products.findIndex(
        (prod) => prod.title === action.payload.title
      );
      if (1 < action.payload.quantity) {
        state.products[index].quantity -= 1;
        state.totalPrice -= action.payload.price - action.payload.remise;
        state.promoPrice = 0;
      }
    },
    plusQuantity: (state, action) => {
      const index = state.products.findIndex(
        (prod) => prod.title === action.payload.title
      );
      state.products[index].quantity += 1;
      state.totalPrice += action.payload.price - action.payload.remise;
      state.promoPrice = 0;
    },
    addProd: (state, action) => {
      const index = state.wishlist.findIndex(
        (prod) => prod.title === action.payload.title
      );
      if (0 <= index) {
        alert("product in wishlist !");
      } else {
        state.wishlist.push(action.payload);
      }
    },
    deleteProd: (state, action) => {
      const index = state.wishlist.findIndex(
        (prod) => prod.title === action.payload.title
      );
      state.wishlist.splice(index, 1);
    },
    checkOut: (state) => {
      state.products = [];
      state.quantity = 0;
      state.totalPrice = 0;
      state.promoPrice = 0;
    },
    
  },
});
export const {
  addProduct,
  deleteProduct,
  minusQuantity,
  plusQuantity,
  addProd,
  deleteProd,
  userCart,
  checkOut
} = cartSlice.actions;
export default cartSlice.reducer;
