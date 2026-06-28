import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    reviews: []
}

export const addReview = createAsyncThunk('/review',
    async (reviewData) => {
        const result = await axios.post(`${import.meta.env.VITE_API_URL}/api/shop/review/add`, reviewData);
        console.log("result",result);
        return result?.data;
    }
)

export const getReviews = createAsyncThunk('/getReviews',
    async (productId) => {
        const result = await axios.get(`${import.meta.env.VITE_API_URL}/api/shop/review/${productId}`);
        console.log(result);
        
        return result?.data;
    }
)

const reviewSlice = createSlice({
    name: "reviewSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getReviews.pending, (state) => {
            state.isLoading = true;
        }).addCase(getReviews.fulfilled, (state, action) => {
            state.isLoading = false;
            state.reviews = action.payload?.data;
        }).addCase(getReviews.rejected, (state) => {
            state.isLoading = false;
            state.reviews = [];
        })
    }
}) 


export default reviewSlice.reducer