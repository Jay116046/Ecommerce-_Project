import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    isAuthenticated:false,
    isLoading:true,
    user:null,
}

export const register = createAsyncThunk('/auth/register',
    async (formData)=>{
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`,formData,{
            withCredentials:true
        })
    // console.log(response);
        
    return response.data
    }
)

export const login = createAsyncThunk('/auth/login',
    async (formData)=>{
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`,formData,{
            withCredentials:true
        })        
    // console.log(response.data);
    return response.data
    }
)

export const logOut = createAsyncThunk('/auth/logout',
    async ()=>{
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/logout`,{},{
            withCredentials:true
        })
    return response.data
    }
)

export const authCheck = createAsyncThunk('/auth/authcheck',
    async ()=>{
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/authcheck`,{
            withCredentials:true,
            headers:{
                'Cache-Control': 'no-store,no-cache,must-revalidate,proxy-revalidate',
                Expires:'0'
            }
        })
    return response.data
    }
)

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        setUser:(state,action)=>{},
    },
    extraReducers:(builder)=>{
        builder.addCase(register.pending,(state)=>{
            state.isLoading=true;
        }).addCase(register.fulfilled,(state,action)=>{
            state.isLoading=false,
            state.user = null;
            state.isAuthenticated=false;
        }).addCase(register.rejected,(state,action)=>{
            state.isLoading=false,
            state.user = null;
            state.isAuthenticated=false;
        })
        
        
        .addCase(login.pending,(state)=>{
            state.isLoading=true;
        }).addCase(login.fulfilled,(state,action)=>{
            state.isLoading=false,
            state.user = !action.payload.success ? null: action.payload.user;
            state.isAuthenticated= !action.payload.success ? false:true; 
        }).addCase(login.rejected,(state,action)=>{
            state.isLoading=false,
            state.user = null;
            state.isAuthenticated=false;
        })
        
        
        .addCase(authCheck.pending,(state)=>{
            state.isLoading=true;
        }).addCase(authCheck.fulfilled,(state,action)=>{
            state.isLoading=false,
            state.user = !action.payload.success ? null: action.payload.user;
            state.isAuthenticated= !action.payload.success ? false:true; 
        }).addCase(authCheck.rejected,(state,action)=>{
            state.isLoading=false,
            state.user = null;
            state.isAuthenticated=false;
        })
        
        
        .addCase(logOut.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(logOut.fulfilled,(state)=>{
            state.isLoading=false;
            state.isAuthenticated=false;
            state.user=null;
        })
    }
})


export const {setUser} = authSlice.actions;
export default authSlice.reducer