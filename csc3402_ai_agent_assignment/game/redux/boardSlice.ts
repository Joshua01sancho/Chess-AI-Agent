// boardSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BoardStateType } from '@/types/board_state_type';
import { generateInitialBoardState } from '@/util/board_util';

export interface ReduxBoardState {
    future: Array<BoardStateType>;
    current: BoardStateType;
    history: Array<BoardStateType>;
}

const initialState: ReduxBoardState = {
    future: [],
    current: generateInitialBoardState(),
    history: []
};

const boardSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {
        updateBoard(state, action: PayloadAction<Partial<BoardStateType>>) {
            /*
            // Push the current state to history (for undo)
            if (state.history.length >= 3) {
                state.history.shift(); // Remove oldest state if we have 3 already
            }
            state.history.push(state.current); // Save current state for undo
            state.future = []; // Clear future states on new update
            */

            // Update the current state
            state.current = action.payload as BoardStateType;
        },
        undo(state) {
            if (state.history.length > 0) {
                const previousState = state.history.pop();
                if (previousState) {
                    // Push the current state to future (for redo)
                    if (state.future.length >= 3) {
                        state.future.shift(); // Remove oldest redo state if we have 3 already
                    }
                    state.future.push(state.current);
                    // Restore previous state
                    state.current = previousState;
                }
            }
        },
        redo(state) {
            if (state.future.length > 0) {
                const nextState = state.future.pop();
                if (nextState) {
                    // Push the current state to history (for undo)
                    if (state.history.length >= 3) {
                        state.history.shift(); // Remove oldest undo state if we have 3 already
                    }
                    state.history.push(state.current);
                    // Restore next state
                    state.current = nextState;
                }
            }
        },
    },
});

export const { updateBoard, undo, redo } = boardSlice.actions;
export default boardSlice.reducer;