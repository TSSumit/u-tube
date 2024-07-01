// utils/historySlice.js
import { createSlice } from '@reduxjs/toolkit';

const historySlice = createSlice({
  name: 'history',
  initialState: [],
  reducers: {
    addVideoToHistory: (state, action) => {
      // Remove any existing instance of the video
      const existingIndex = state.findIndex(video => video.id === action.payload.id);
      if (existingIndex !== -1) {
        state.splice(existingIndex, 1);
      }

      // Add the new video to the front
      state.unshift(action.payload);

      // Ensure the history does not exceed 150 items
      if (state.length > 150) {
        state.pop();
      }
    }
  }
});

export const { addVideoToHistory } = historySlice.actions;
export default historySlice.reducer;
