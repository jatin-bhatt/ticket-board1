import { configureStore } from "@reduxjs/toolkit";
import boardReducer from "./slices/boardSlice";
import ticketReducer from "./slices/ticketSlice";

const store = configureStore({
  reducer: {
    board: boardReducer,
    ticket: ticketReducer,
  },
});

export default store;