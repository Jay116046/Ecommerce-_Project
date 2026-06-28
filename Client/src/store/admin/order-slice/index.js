import { resetOrderDetails } from "@/store/shop/order-slice";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    orderList: [],
    orderDetails: null
}


export const getOrderByAllUser = createAsyncThunk('/orders/getOrderByAllUser',
    async () => {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/orders/get`)
        // console.log("response", response);
        return response?.data;
    })

export const getOrderDetailsforAdmin = createAsyncThunk('/orders/getOrderDetailsforAdmin',
    async (id) => {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/orders/details/${id}`)
        // console.log("response", response);
        return response?.data;
    })

export const updateOrderStatus = createAsyncThunk('/orders/updateOrderStatus',
    async ({id,status}) => {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/orders/update/${id}`,{status})
        // console.log("response", response);
        return response?.data;
    })


const adminOrderSlice = createSlice({
    name: 'AdminOrderSlice',
    initialState,
    reducers: {
        resetAdminOrderDetails:(state)=>{
            state.orderDetails=null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getOrderByAllUser.pending, (state) => {
            state.isLoading = true;
        }).addCase(getOrderByAllUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.orderList = action.payload.data;
        }).addCase(getOrderByAllUser.rejected, (state) => {
            state.isLoading = false;
            state.orderList = [];
        })

            .addCase(getOrderDetailsforAdmin.pending, (state) => {
                state.isLoading = true;
            }).addCase(getOrderDetailsforAdmin.fulfilled, (state, action) => {
                state.isLoading = false;
                state.orderDetails = action.payload.data;
            }).addCase(getOrderDetailsforAdmin.rejected, (state) => {
                state.isLoading = false;
                state.orderDetails = null;
            })
    }
})

export const  {resetAdminOrderDetails} = adminOrderSlice.actions;

export default adminOrderSlice.reducer;
