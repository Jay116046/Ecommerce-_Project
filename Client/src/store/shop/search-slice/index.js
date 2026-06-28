import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    searchProductsList: [],
}


export const searchProducts = createAsyncThunk('/search',
    async ({ keyword }) => {
        const result = await axios.get(`${import.meta.env.VITE_API_URL}/api/shop/search/${keyword}`);
        // console.log(result);
        return result?.data;
    }
)

const searchSlice = createSlice({
    name: 'searchProducts',
    initialState: initialState,
    reducers: {
        resetSearchResult : (state)=>{
            state.searchProductsList = [];
        }
    },
    extraReducers: (builder) => {
        builder.addCase(searchProducts.pending, (state) => {
            state.isLoading = true;
        }).addCase(searchProducts.fulfilled, (state, action) => {
            // console.log(action.payload);
            state.isLoading = false;
            state.searchProductsList = action.payload.data;
        }).addCase(searchProducts.rejected, (state, action) => {
            state.isLoading = false;
            state.searchProductsList = [];
        })
    }

})

export const {resetSearchResult} = searchSlice.actions; 

export default searchSlice.reducer
