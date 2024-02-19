import { createSlice } from "@reduxjs/toolkit";

const boardSlice = createSlice({
  name: "board",
  initialState: {
    data: [],
    loading: false,
    error: null,
    modalBoardId: null, // hide = null, show => create = "", edit = ticketId
  },
  reducers: {
    setBoardData: (state, action) => {
      state.data = action.payload;
    },
    addBoardData: (state, action) => {
      state.data = [...state.data, action.payload];
    },
    setBoardLoading: (state, action) => {
      state.loading = action.payload;
    },
    setBoardError: (state, action) => {
      state.error = action.payload;
    },
    showBoardModal: (state, action) => {
      state.modalBoardId = action.payload;
    },
    hideBoardModal: (state, action) => {
      state.modalBoardId = null;
    },

  },
});

export const { setBoardData, addBoardData, setBoardLoading, setBoardError, showBoardModal, hideBoardModal } = boardSlice.actions;

export default boardSlice.reducer;