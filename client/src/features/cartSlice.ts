import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { data } from "../types/productType";
import axios from "axios";

const ifCartExists = localStorage.getItem("cart");
const cartFromLocalStorage = ifCartExists ? JSON.parse(ifCartExists) : null;

export interface CartItem {
  product: data;
  quantity: number;
}

const initialState: { items: CartItem[]; loading: boolean; error: string } = {
  items: cartFromLocalStorage || [],
  loading: false,
  error: ''
};

export const addToCart = createAsyncThunk(
  "cart/addToCartAsync",
  async ({
    productId,
    userId,
    quantity,
  }: {
    productId: string | undefined;
    userId: string;
    quantity: number | undefined;
  }) => {
    try {
      await axios.post("http://localhost:5000/add-to-cart", {
        productId,
        userId,
        quantity,
      });
    } catch (err: any) {
      throw new Error(err.response.data.error);
    }
  }
);

export const getUserCart = createAsyncThunk(
  "cart/getUserCart",
  async (userId: string | undefined) => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/my-cart/${userId}`
      );
      return data;
    } catch (err: any) {
      throw new Error(err.response.data.error);
    }
  }
);

export const updateCartQuantity = createAsyncThunk(
  "cart/updateCartQuantity",
  async ({
    productId,
    userId,
    quantity,
  }: {
    productId: string;
    userId: string;
    quantity: number;
  }) => {
    try {
      await axios.put(`http://localhost:5000/update-cart-quantity`, {
        productId,
        userId,
        quantity,
      });
    } catch (err: any) {
      throw new Error(err.response.data.error);
    }
  }
);

export const syncCartItem = createAsyncThunk(
  "cart/syncCartItem",
  async ({
    userId,
    cartItems,
  }: {
    userId: string | undefined;
    cartItems: { product: data; quantity: number }[];
  }) => {
    try {
      await axios.post(`http://localhost:5000/sync-cart`, {
        userId,
        cartItems,
      });
    } catch (err: any) {
      throw new Error(err.response.data.error);
    }
  }
);

export const removeCartItem = createAsyncThunk(
  "cart/removeCartItem",
  async ({
    productId,
    userId,
  }: {
    productId: string;
    userId: string | undefined;
  }) => {
    try {
      await axios.post(`http://localhost:5000/remove-cart-item`, {
        productId,
        userId,
      });
    } catch (err: any) {
      throw new Error(err.response.data.error);
    }
  }
);

export const removeAllCartItem = createAsyncThunk(
  "cart/removeAllCartItem",
  async ({
    userId
  }: {
    userId: string | undefined;
  }) => {
    try {
      await axios.post(`http://localhost:5000/remove-all-items`, {
        userId
      });
    } catch (err: any) {
      throw new Error(err.response.data.error);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProductToCart: (state, action) => {
      const productIndex = state.items.findIndex(
        (item) => item.product._id === action.payload._id
      );
      if (productIndex !== -1) {
        state.items[productIndex].quantity += 1;
      } else {
        state.items.push({ product: action.payload, quantity: 1 });
      }
    },
    removeProductFromCart: (state, action) => {
      const productIndex = state.items.findIndex(
        (item) => item.product._id === action.payload._id
      );
      // if no item found then findIndex() returns -1,
      // so this check is crucial for unexpected behaviour
      if (productIndex !== -1) {
        state.items.splice(productIndex, 1);
        // also update local storage cart
        const localCart = localStorage.getItem("cart");
        if (localCart) {
          let cart = JSON.parse(localCart);
          cart.splice(productIndex, 1);
          localStorage.setItem("cart", JSON.stringify(cart));
        }
      }
    },
    clearAllCartItems: (state) => {
      state.items = [];
    },
    increaseProductQuantity: (state, action) => {
      const productIndex = state.items.findIndex(
        (item) => item.product._id === action.payload.product._id
      );
      if (productIndex !== -1) {
        state.items[productIndex].quantity += 1;
      }
    },
    decreaseProductQuantity: (state, action) => {
      const productIndex = state.items.findIndex(
        (item) => item.product._id === action.payload.product._id
      );
      if (productIndex !== -1) {
        if (state.items[productIndex].quantity > 1) {
          state.items[productIndex].quantity -= 1;
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(addToCart.fulfilled, (state) => {
        state.loading = false;
        state.error = '';
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'something went wrong'
      })
      .addCase(getUserCart.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(getUserCart.fulfilled, (state, action) => {
        state.items = action.payload.cart.map((item: CartItem) => ({
          product: item.product,
          quantity: item.quantity,
        }));
        state.loading = false;
        state.error = '';
      })
      .addCase(getUserCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'something went wrong'
      })
      .addCase(removeAllCartItem.fulfilled, (state) => {
        state.items = [];
      })
  },
});

export const {
  addProductToCart,
  removeProductFromCart,
  increaseProductQuantity,
  decreaseProductQuantity,
  clearAllCartItems,
} = cartSlice.actions;
export default cartSlice.reducer;
