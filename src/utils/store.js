import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./appSlice.js";
import searchSlice from "./searchSlice.js";
import historySlice from './historySlice.js';
import chatSlice from "./chatSlice.js";
import buttonListSlice from "./buttonListSlice.js";

const store = configureStore({
  reducer: {
    app: appSlice,
    search: searchSlice,
    history: historySlice,
    chat: chatSlice,
    buttonList: buttonListSlice,
  }
});

export default store;
