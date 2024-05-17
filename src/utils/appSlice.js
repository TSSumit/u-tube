import { createSlice } from "@reduxjs/toolkit";


const appSlice=createSlice({
    name:"app",
    initialState:{
        isMenueOpen:false,
    },
    reducers:{
        toggleMenue:(state)=>{
            state.isMenueOpen=!state.isMenueOpen;
        }
    }
})

export const { toggleMenue }=appSlice.actions;
export default appSlice.reducer;