// src/redux/playerSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PlayerType } from "@/types/player_type";
import { player1Id, player2Id } from "@/contants";

// Define the initial state
interface PlayerState {
    players: PlayerType[],
    currentPlayerIndex: number,
    gameOver: boolean,
}

const initialState: PlayerState = {
    players: [
        { playerId: player1Id, playerName: "Player 1", turn: true, score: 0 }, // Player 1
        { playerId: player2Id, playerName: "AI Agent", turn: false, score: 0 }  // Player 2
    ],
    currentPlayerIndex: 0,
    gameOver: false,
};

const playerSlice = createSlice({
    name: "players",
    initialState,
    reducers: {
        setPlayerNames: (state, action: PayloadAction<{ player1Name: string, player2Name: string }>) => {
            state.players[0].playerName = action.payload.player1Name;
            state.players[1].playerName = action.payload.player2Name;
        },
        switchTurn: (state) => {
            state.currentPlayerIndex = state.currentPlayerIndex === 0 ? 1 : 0;
            state.players[0].turn = !state.players[0].turn;
            state.players[1].turn = !state.players[1].turn;
        },
        updateScore: (state, action: PayloadAction<{ playerId: string, increment: number }>) => {
            const player = state.players.find(player => player.playerId === action.payload.playerId);
            if (player) {
                player.score += action.payload.increment;
            }
        },
        endGame: (state, action: PayloadAction<{ winnerId: string }>) => {
            state.gameOver = true;
            const winner = state.players.find(player => player.playerId === action.payload.winnerId);
            alert(`${winner?.playerName} has won the game!`);
        },
        resetGame: (state) => {
            state.players[0].score = 0;
            state.players[1].score = 0;
            state.currentPlayerIndex = 0;
            state.players[0].turn = true;
            state.players[1].turn = false;
            state.gameOver = false;
        }
    }
});

export const { setPlayerNames, switchTurn, updateScore, endGame, resetGame } = playerSlice.actions;
export default playerSlice.reducer;
