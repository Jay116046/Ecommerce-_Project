import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    isLoading: false,
    productList: [],
    productDetails:null
}

export const fetchFilteredProducts = createAsyncThunk('/products/getProducts',
    async ({ filterParams, sortParams }) => {

        const query = new URLSearchParams({
            ...filterParams,
            sortBy: sortParams
        })

        const result = await axios.get(`${import.meta.env.VITE_API_URL}/api/shop/products/getProducts?${query}`,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        // console.log(result);
        return result?.data
    }
)

export const getProductDetails = createAsyncThunk("/products/getProducts/:id",
    async ({ id }) => {

        const result = await axios.get(`${import.meta.env.VITE_API_URL}/api/shop/products/getProducts/${id}`,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        // console.log(result);
        return result?.data
    }
)

const shoppingProductSlice = createSlice({
    name: 'shoppingProducts',
    initialState: initialState,
    reducers: {
        setProductDetails:(state)=>{
            state.productDetails=null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchFilteredProducts.pending, (state) => {
            state.isLoading = true;
        }).addCase(fetchFilteredProducts.fulfilled, (state, action) => {
            // console.log(action.payload);
            state.isLoading = false;
            state.productList = action.payload.data;
        }).addCase(fetchFilteredProducts.rejected, (state, action) => {
            state.isLoading = false;
            state.productList = [];
        })
        .addCase(getProductDetails.pending, (state) => {
            state.isLoading = true;
        }).addCase(getProductDetails.fulfilled, (state, action) => {
            // console.log(action.payload);
            state.isLoading = false;
            state.productDetails = action.payload.data;
        }).addCase(getProductDetails.rejected, (state, action) => {
            state.isLoading = false;
            state.productDetails = null ;
        })
    }
})

export const {setProductDetails} = shoppingProductSlice.actions; 

export default shoppingProductSlice.reducer
