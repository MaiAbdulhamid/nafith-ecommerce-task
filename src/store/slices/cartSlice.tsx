import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { ProductType } from "../../types/Product";
import Api from "../../helpers/Api";

type InitialStateTypes = {
  cart: ProductType[];
  items: ProductType[];
  singleProduct: ProductType;
  totalQuantity: number;
  totalPrice: number;
  product: Array<any>;
};

const initialState: InitialStateTypes = {
  cart: [],
  items: [],
  singleProduct: {
    id: 0,
    title: "",
    price: "",
    category: "",
    description: "",
    image: "",
    quantity: 0,
    rating: {
      rate: 0,
      count: 0,
    },
  },
  totalQuantity: 0,
  totalPrice: 0,
  product: [],
};

export const fetchProducts = createAsyncThunk(
  "cart/fetchProducts",
  async () => {
    const response = await Api.get("/products");
    return response.data;
  }
);

export const fetchSortedProducts = createAsyncThunk(
  "cart/fetchSortedProducts",
  async (sort: string) => {
    const response = await Api.get(`/products?sort=${sort}`);
    return response.data;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: { payload: ProductType }) => {
      toast.success("your product was added successfully");
      const itemInCart = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (itemInCart) {
        itemInCart.quantity++;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    getCartTotal: (state: InitialStateTypes) => {
      const { totalQuantity, totalPrice } = state.cart.reduce(
        (
          cartTotal: { totalPrice: number; totalQuantity: any },
          cartItem: { price: any; quantity: any }
        ) => {
          const { price, quantity } = cartItem;
          const itemTotal = Number(price) * quantity;
          cartTotal.totalPrice += itemTotal;
          cartTotal.totalQuantity += quantity;
          return cartTotal;
        },
        {
          totalPrice: 0,
          totalQuantity: 0,
        }
      );
      state.totalPrice = totalPrice;
      state.totalQuantity = totalQuantity;
    },
    removeFromCart: (state: InitialStateTypes, action: { payload: any }) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
    increaseItemQuantity: (
      state: InitialStateTypes,
      action: { payload: any }
    ) => {
      state.cart = state.cart.map((item) => {
        if (item.id === action.payload) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
    },
    decreaseItemQuantity: (
      state: InitialStateTypes,
      action: { payload: any }
    ) => {
      state.cart = state.cart.map((item) => {
        if (item.id === action.payload && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
    },
    productDetail: (
      state: InitialStateTypes,
      action: { payload: { id: any } }
    ) => {
      const findProduct = state.items.find(
        (item) => item.id === action.payload.id
      );
      state.singleProduct = findProduct!;
    },
    filterCategory: (state: InitialStateTypes, action: { payload: string }) => {
      const result =
        action.payload === "all"
          ? (state.product = state.items)
          : state.items.filter((item) => {
              return item.category === action.payload;
            });

      state.product = result;
    },
    sortProducts: (state: InitialStateTypes, action: { payload: any }) => {
      let SortedProducts;

      if (action.payload.q) {
        SortedProducts = state.items.filter((product) => {
          return product.title
            .toLowerCase()
            .includes(action.payload.q.toLowerCase());
        });
      } else {
        SortedProducts = state.items.sort((a, b) => {
          if (action.payload === "rating") {
            return b.rating.rate - a.rating.rate;
          }
          if (action.payload === "price_low_high") {
            return Number(a.price) - Number(b.price);
          }
          if (action.payload === "price_high_low") {
            return Number(b.price) - Number(a.price);
          }
          return 1;
        });
      }

      state.product = SortedProducts;
    },
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(fetchProducts.fulfilled, (state: any, action: any) => {
        state.items = action.payload;
        state.product = action.payload;
      })
      .addCase(fetchSortedProducts.fulfilled, (state: any, action: any) => {
        state.items = action.payload;
        state.product = action.payload;
      })
      .addCase(fetchProducts.rejected, (_state: any, action: any) => {
        console.error("Error fetching products:", action.error);
      })
      .addCase(fetchSortedProducts.rejected, (_state: any, action: any) => {
        console.error("Error fetching sorted products:", action.error);
      });
  },
});

export const {
  addToCart,
  getCartTotal,
  removeFromCart,
  increaseItemQuantity,
  decreaseItemQuantity,
  productDetail,
  filterCategory,
  sortProducts,
} = cartSlice.actions;

export default cartSlice.reducer;
