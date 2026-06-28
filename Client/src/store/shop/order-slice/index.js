import { createAsyncThunk } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"
import axios from "axios"


const initialState = {
    approvalUrl: null,
    isLoading: false,
    orderId: null,
    orderList:[],
    orderDetails:null
}


export const createNewOrder = createAsyncThunk('/order/create',
    async (orderData) => {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/shop/order/create`, orderData)
        console.log("response", response);
        return response?.data;
    })


export const capturePayment = createAsyncThunk('/order/capture',
    async ({paymentId, payerId, orderId }) => {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/shop/order/capture`, {paymentId, payerId, orderId })
        // console.log("response", response);
        return response?.data;
    })

export const getOrderByUserId = createAsyncThunk('/order/getOrderByUserId',
    async (userId) => {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/shop/order/list/${userId}`)
        // console.log("response", response);
        return response?.data;
    })

export const getOrderDetailsById = createAsyncThunk('/order/getOrderDetailsById',
    async (id) => {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/shop/order/details/${id}`)
        // console.log("response", response);
        return response?.data;
    })

const shoppingOrderSlice = createSlice({
    name: "shoppingOrderSlice",
    initialState,
    reducers: {
        resetOrderDetails : (state,action)=>{
            state.orderDetails = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createNewOrder.pending, (state) => {
            state.isLoading = true;
        }).addCase(createNewOrder.fulfilled, (state, action) => {
            console.log(action);
            state.isLoading = false;
            state.approvalUrl = action.payload.approvalUrl;
            state.orderId = action.payload.orderId;

            sessionStorage.setItem("CurrentOrderId", JSON.stringify(action.payload.orderId));

        }).addCase(createNewOrder.rejected, (state) => {
            state.isLoading = false;
            state.approvalUrl = null;
            state.orderId = null;
        })


        .addCase(getOrderByUserId.pending, (state) => {
            state.isLoading = true;
        }).addCase(getOrderByUserId.fulfilled, (state, action) => {
            state.isLoading = false;
            state.orderList = action?.payload?.data;

        }).addCase(getOrderByUserId.rejected, (state) => {
            state.isLoading = false;
            state.orderList = []; 
        })

        .addCase(getOrderDetailsById.pending, (state) => {
            state.isLoading = true;
        }).addCase(getOrderDetailsById.fulfilled, (state, action) => {
            state.isLoading = false;
            state.orderDetails = action?.payload?.data;

        }).addCase(getOrderDetailsById.rejected, (state) => {
            state.isLoading = false;
            state.orderDetails = null; 
        })
    }
})


export const { resetOrderDetails} = shoppingOrderSlice.actions;

export default shoppingOrderSlice.reducer
