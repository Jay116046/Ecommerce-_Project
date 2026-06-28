import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    featuresList: []
}

export const addFeature = createAsyncThunk('/common/addFeature',
    async (data) => {
        const result = await axios.post(`${import.meta.env.VITE_API_URL}/api/common/feature/addFeature`, data)

        return result?.data;
    }
)


export const getFeatures = createAsyncThunk('/common/getFeatures',
    async () => {
        const result = await axios.get(`${import.meta.env.VITE_API_URL}/api/common/feature/getFeature`);
        console.log(result);
        return result?.data;
    }
)

const featureSlice = createSlice({
    name: "featureSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getFeatures.pending, (state) => {
            state.isLoading = true;
        }).addCase(getFeatures.fulfilled, (state, action) => {
            // console.log(action.payload);
            state.isLoading = false;
            state.featuresList = action.payload.data;
        }).addCase(getFeatures.rejected, (state, action) => {
            state.isLoading = false;
            state.featuresList = [];
        })
    }
})

export default featureSlice.reducer ;