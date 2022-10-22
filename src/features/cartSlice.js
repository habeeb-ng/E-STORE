import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cart: []
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        firstCall: (state, action) => {
            state.cart = action.payload;
        },
        updateCart: (state, action) => {
            state.cart = action.payload;
        },
        defaultCartState: (state) => {
            state.cart = [];
        }
        
    }
})

export const { firstCall, updateCart, defaultCartState } = cartSlice.actions;
export default cartSlice.reducer;