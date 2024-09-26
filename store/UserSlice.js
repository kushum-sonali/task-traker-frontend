import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
    name:'user',
    initialState:{
        user:null,
    },
    reducers:{
        login:(state,action)=>{
            state.user=action.payload;
            console.log("reducer data",state.user)


        },
        logout:(state)=>{
            state.user=null;
            localStorage.removeItem('user');
        },
    },
});
export const {login,logout}=userSlice.actions;
export default userSlice.reducer;