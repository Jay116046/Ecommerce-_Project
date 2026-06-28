import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading:false,
    productList:[]
} 

export const fetchAllProducts = createAsyncThunk('/product/get-products',
    async () =>{

        const result =await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/product/get-products`)
        // console.log(result?.data.data);
        return result?.data ;
    }
) 

export const addNewProduct = createAsyncThunk('/product/add-product',
    async (formData) =>{
        const result =await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/product/add-product`,formData,
            {
                headers:{
                    'Content-Type':'application/json'
                }
            }
        )
        return result?.data ;
    }
) 


export const editProduct = createAsyncThunk('/product/update-product',
        async (res) =>{
        
        const result =await axios.put(`${import.meta.env.VITE_API_URL}/api/admin/product/update-product/${res.id}`,res.formData,
            {
                headers:{
                    'Content-Type':'application/json'
                }
            }
        )
        return result?.data ;
    }
)

export const deleteProduct = createAsyncThunk('/product/delete-product',
    async (id) =>{
        const result =await axios.delete(`${import.meta.env.VITE_API_URL}/api/admin/product/delete-product/${id}`,
            {
                headers:{
                    'Content-Type':'application/json'
                }
            }
        )
        return result?.data ;
    }
) 

const  adminProductSlice = createSlice({
    name:'adminProductSlice',
    initialState:initialState,
    reducers:{}, 
    extraReducers: (builder)=>{
        builder.addCase(fetchAllProducts.pending,(state,action)=>{
            state.isLoading=true;
        }).addCase(fetchAllProducts.fulfilled,(state,action)=>{
            console.log(action.payload);
            state.isLoading=false;
            state.productList = action.payload.data;
        }).addCase(fetchAllProducts.rejected,(state,action)=>{
            state.isLoading=false;
            state.productList=[];
        })
    }
})

export default adminProductSlice.reducer