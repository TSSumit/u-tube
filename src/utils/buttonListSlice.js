import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedButton: 'All'
};

const buttonListSlice = createSlice({
  name: 'buttonList',
  initialState,
  reducers: {
    selectButton: (state, action) => {
      state.selectedButton = action.payload;
    }
  }
});

export const { selectButton } = buttonListSlice.actions;

export default buttonListSlice.reducer;
