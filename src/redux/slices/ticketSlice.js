import { createSlice } from "@reduxjs/toolkit";

const ticketSlice = createSlice({
  name: "ticket",
  initialState: {
    data: {},
    loading: false,
    error: null,
    modalTicketId: null, // hide = null, show => create = "", edit = ticketId
    deleteTicketId: null, // hide = null, show => create = ticketId,
  },
  reducers: {
    setTicketData: (state, action) => {
      state.data = action.payload;
    },
    addTicketData: (state, action) => {
      state.data.tickets = [...state.data.tickets, action.payload];
    },
    updateTicketData: (state, action) => {
      const index = state.data.tickets.findIndex(item => item.id === action.payload.id)
      if (index !== -1) {
        state.data.tickets[index] = action.payload;
      }
    },
    removeTicketData: (state, action) => {
      state.data.tickets = state.data.tickets.filter((item) => item.id !== action.payload);
    },
    setTicketLoading: (state, action) => {
      state.loading = action.payload;
    },
    setTicketError: (state, action) => {
      state.error = action.payload;
    },
    showTicketModal: (state, action) => {
      state.modalTicketId = action.payload;
    },
    hideTicketModal: (state, action) => {
      state.modalTicketId = null;
    },
    showDeleteTicketModal: (state, action) => {
      state.deleteTicketId = action.payload;
    },
    hideDeleteTicketModal: (state, action) => {
      state.deleteTicketId = null;
    }
  },
});

export const { setTicketData, addTicketData, updateTicketData, 
  removeTicketData, setTicketLoading, setTicketError, 
  showTicketModal, hideTicketModal,
  showDeleteTicketModal, hideDeleteTicketModal,
 } = ticketSlice.actions;

export default ticketSlice.reducer;