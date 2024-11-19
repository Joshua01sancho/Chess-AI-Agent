import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    fromSquare: [-1, -1] as [number, number], // row and col coordinates
    toSquare: [-1, -1] as [number, number],
    fromSquareSelected: false,
    toSquareSelected: false
}

const squareSlice = createSlice({
    name: 'squares',
    initialState,
    reducers: {
        updateFromSquare(state, action: PayloadAction<[number, number]>) {
            state.fromSquare = action.payload; // Replace fromSquare with new array
        },
        updateToSquare(state, action: PayloadAction<[number, number]>) {
            state.toSquare = action.payload; // Replace toSquare with new array
        },
        fromSquareSelected(state) {
            state. fromSquareSelected = true
        },
        toSquareSelected(state) {
            state.toSquareSelected = true
        },
        fromSquareDeselected(state) {
            state.fromSquareSelected = false
        },
        toSquareDeselected(state) {
            state.toSquareSelected = false
        },
        clearSquareSelections(state) {
            state.fromSquare = [-1, -1]
            state.toSquare = [-1, -1]
            state.fromSquareSelected = false
            state.toSquareSelected = false
        }
    },
})

export const { 
    updateFromSquare,
    updateToSquare,
    fromSquareSelected,
    fromSquareDeselected,
    toSquareSelected,
    toSquareDeselected,
    clearSquareSelections 
} = squareSlice.actions;

export default squareSlice.reducer;
