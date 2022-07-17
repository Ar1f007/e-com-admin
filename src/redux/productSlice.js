import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  isFetching: false,
  error: false,
};
export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    getProductStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getProductSuccess: (state, action) => {
      state.isFetching = false;
      state.products = action.payload;
    },
    getProductFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
  },
});

export const { getProductStart, getProductSuccess, getProductFailure } = productSlice.actions;

export default productSlice.reducer;
