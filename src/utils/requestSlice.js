import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
    name: "requests",
    initialState: [],
    reducers: {
        addRequests: (state, action) => action.payload,
        removeUpdatedRequest: (state, action) => {
            const newArray = state.filter((req) => req._id !== action.payload);
            return newArray;
        },
        removeRequests: () => null
    },
});

export const { addRequests, removeUpdatedRequest, removeRequests } = requestSlice.actions;

export default requestSlice.reducer;