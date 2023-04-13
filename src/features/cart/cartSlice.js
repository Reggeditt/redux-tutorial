import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  amount: 0,
  total: 0,
  isLoading: true,
};

export const getCartItems = createAsyncThunk("cart/getCartItems", async () => {
  const response = await fetch("https://course-api.com/react-useReducer-cart-project");
  return await response.json();
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
      state.amount = 0;
    },
    removeItem: (state, action) => {
      const id = action.payload;
      const newCart = state.cartItems.filter((item) => item.id !== id);
      state.cartItems = newCart;
    },
    increase: (state, action) => {
      const id = action.payload;
      const newCart = state.cartItems.map((item) => {
        if (item.id === id) {
          item.amount += 1;
        }
        return item;
      });
      state.cartItems = newCart;
    },
    decrease: (state, action) => {
      const id = action.payload;
      const newCart = state.cartItems
        .map((item) => {
          if (item.id === id) {
            item.amount -= 1;
          }
          return item;
        })
        .filter((item) => item.amount !== 0);
        state.cartItems = newCart;
    },
    getTotals: (state, action) => {
      const { total, amount } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, amount } = cartItem;
          const itemTotal = price * amount;
          cartTotal.total += itemTotal;
          cartTotal.amount += amount;
          return cartTotal;
        },
        {
          total: 0,
          amount: 0,
        }
      );
      state.total = total.toFixed(2);
      state.amount = amount;
    },
  },
  extraReducers: {
    [getCartItems.pending]: (state) => {
      state.isLoading = true;
    },
    [getCartItems.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.cartItems = action.payload;
      console.log('action.payload after fetch is fullfilled is ...', action.payload);
    },
    [getCartItems.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

console.log(cartSlice);

export const { clearCart, removeItem, increase, decrease, getTotals } = cartSlice.actions;

export default cartSlice.reducer;
