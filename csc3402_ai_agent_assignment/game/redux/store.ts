// redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import boardReducer from './boardSlice';
import squaresReducer from './squareSlice'
import playersReducer from './playersSlice'
import messageReducer from './messageSlice'


const store = configureStore({
  reducer: {
    board: boardReducer,
    squares: squaresReducer,
    players: playersReducer,
    message: messageReducer
  },
});

export default store;