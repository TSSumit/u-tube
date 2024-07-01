import { createSlice } from "@reduxjs/toolkit";

const appSlice=createSlice({
    name:"app",
    initialState:{
        isMenuOpen:false,
    },
    reducers:{
        showMenu:(state)=>{
            state.isMenuOpen=true;
        },
        closeMenu:(state)=>{
            state.isMenuOpen=false;
        }

    }
})

export const { showMenu, closeMenu }=appSlice.actions;
export default appSlice.reducer;
