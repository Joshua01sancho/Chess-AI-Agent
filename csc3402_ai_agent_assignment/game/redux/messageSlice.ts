import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const initialMessage = "Welcome players."

const initialState = {
    message: initialMessage
}

const squareSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        updateMessage(state, action) {
            state.message = action.payload;
        }
    },
})

export const {
    updateMessage, 
} = squareSlice.actions;

export default squareSlice.reducer;
