import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    cartItems: [],
    isLoading: false
}

export const addToCart = createAsyncThunk('cart/addToCart',
    async ({ userId, productId, quantity }) => {

        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/cart/addToCart`, { userId, productId, quantity })

        return response?.data;
    }
)

export const fetchCartDetails = createAsyncThunk('getCartItems/:userId',
    async (userId) => {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/cart/getCartItems/${userId}`)
        // console.log(response);
        return response?.data?.data; 
    }
)
export const upadateCart = createAsyncThunk('cart/upadateCart',
    async ({ userId, productId, quantity }) => {

        const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/cart/upadateCart`, { userId, productId, quantity })

        // console.log(response);

        return response?.data;
    }
)
export const deleteCart = createAsyncThunk('cart/deleteCart/:userId/:productId',
    async ({ userId, productId }) => {

        const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/cart/deleteCart/${userId}/${productId}`)

        console.log(response);

        return response?.data;
    }
)

const shoppingCartSlice = createSlice({
    name: 'shoppingCart',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addToCart.pending, (state) => {
            state.isLoading = true;
        }).addCase(addToCart.fulfilled, (state, action) => {
            // console.log(action.payload);
            state.isLoading = false;
            state.cartItems = action.payload.data;
        }).addCase(addToCart.rejected, (state, action) => {
            state.isLoading = false;
            state.cartItems = [];
        })
        
        .addCase(fetchCartDetails.pending, (state) => {
            state.isLoading = true;
        }).addCase(fetchCartDetails.fulfilled, (state, action) => {
            // console.log(action?.payload);
            state.isLoading = false;
            state.cartItems = action.payload;
        }).addCase(fetchCartDetails.rejected, (state, action) => {
            state.isLoading = false;
            state.cartItems = [];
        })
        
        .addCase(upadateCart.pending, (state) => {
            state.isLoading = true;
        }).addCase(upadateCart.fulfilled, (state, action) => {
            // console.log(action.payload);
            state.isLoading = false;
            state.cartItems = action.payload.data;
        }).addCase(upadateCart.rejected, (state, action) => {
            state.isLoading = false;
            state.cartItems = [];
        }).
        
        addCase(deleteCart.pending, (state) => {
            state.isLoading = true;
        }).addCase(deleteCart.fulfilled, (state, action) => {
            state.isLoading = false;
            state.cartItems = action.payload.data;
        }).addCase(deleteCart.rejected, (state, action) => {
            state.isLoading = false;
            state.cartItems = [];
        })
    }

})

export default shoppingCartSlice.reducer;