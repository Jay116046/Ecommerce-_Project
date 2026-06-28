import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    isLoading: false,
    addressList: []
}

export const addAddress = createAsyncThunk('/address/add',
    async (formData) => {
        const result =await axios.post(`${import.meta.env.VITE_API_URL}/api/shop/address/add`, formData)
        console.log(result);

        return result?.data
    }
)

export const fetchAllAddress = createAsyncThunk('/address/get/:userId',
    async (userId) => {
        const result =await axios.get(`${import.meta.env.VITE_API_URL}/api/shop/address/get/${userId}`)
        // console.log(result);

        return result?.data
    }
)

export const updateAddress = createAsyncThunk('/address/update/:userId/:addressId',
    async ({ userId, addressId, formData }) => {
        const result =await axios.put(`${import.meta.env.VITE_API_URL}/api/shop/address/update/${userId}/${addressId}`, formData)
        console.log(result);

        return result?.data
    }
)

export const deleteAddress = createAsyncThunk('/delete/:userId/:addressId',
    async ({ userId, addressId }) => {
        const result =await axios.delete(`${import.meta.env.VITE_API_URL}/api/shop/address/delete/${userId}/${addressId}`)
        console.log(result);

        return result?.data
    } 
)

const shopAddressSlice = createSlice({
    name: "shopAddressSlice",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(addAddress.pending, (state) => {
            state.isLoading = true
        }).addCase(addAddress.fulfilled, (state, action) => {
            state.isLoading = false;
            state.addressList = action?.payload?.data;
        }).addCase(addAddress.rejected, (state) => {
            state.isLoading = false;
            state.addressList = [];
        })

        .addCase(fetchAllAddress.pending, (state) => {
            state.isLoading = true
        }).addCase(fetchAllAddress.fulfilled, (state, action) => {
            state.isLoading = false;
            state.addressList = action?.payload?.data;
        }).addCase(fetchAllAddress.rejected, (state) => {
            state.isLoading = false;
            state.addressList = [];
        })
    }

})

 
export default shopAddressSlice.reducer;
