import { BoardStateType } from "@/types/board_state_type";
import SquareType from "@/types/square_type";
import { pieceColor1, pieceColor2 } from "@/contants";

/*
// Simplify Board State
export function simplifyBoardState(boardState: BoardStateType): number[][][] {
    return boardState.map((row) =>
        row.map((square) => {
            const playable = square.playable ? 1 : 0;
            const occupied = square.occupied ? 1 : 0;
            let piece = 0;

            if (square.piece) {
                piece = square.piece.color === pieceColor1 ? 1 : 2; // 1 for player 1's grey, 2 for player 2's blue
            }

            // Return as a 3D array format [playable, occupied, piece]
            return [playable, occupied, piece];
        })
    );
}

// Unsimplify Board State (convert simplified state back to detailed state)
export function unsimplifyBoardState(simplifiedState: number[][][]): BoardStateType {
    return simplifiedState.map((row, rowIndex) =>
        row.map((square, colIndex) => {
            const playable = square[0] === 1;
            const occupied = square[1] === 1;
            let piece = null;

            if (square[2] === 1) {
                piece = { color: pieceColor1, type: 'man' }; // Grey piece for player 1
            } else if (square[2] === 2) {
                piece = { color: pieceColor2, type: 'man' }; // Blue piece for player 2
            }

            return {
                coordinates: [rowIndex, colIndex],
                playable: playable,
                occupied: occupied,
                piece: piece,
            };
        })
    );
}

// Encode state for Machine Learning model (returns number[][][] format)
export function encodeForML(simplifiedState: number[][][]): number[][][] {
    // No change needed because simplifiedState is already in the correct format for ML
    return simplifiedState;
}

// Decode the ML encoded state back to a playable board state
export function decodeFromML(mlEncodedState: number[][][]): any[][] {
    return mlEncodedState.map((row: number[][]) =>
        row.map((square: number[]) => {
            const playable = square[0] === 1;
            const occupied = square[1] === 1;
            let piece = null;

            if (square[2] === 1) {
                piece = { color: pieceColor1, type: 'man' }; // Grey for player 1
            } else if (square[2] === 2) {
                piece = { color: pieceColor2, type: 'man' }; // Blue for player 2
            }

            return {
                playable: playable,
                occupied: occupied,
                piece: piece,
            };
        })
    );
}
*/

export const encodBoardState = (board: BoardStateType): number[][][] => {
    return board.map((row) =>
        row.map((tile) => [
            tile.playable ? 1 : 0, // Is playable
            tile.occupied ? 1 : 0, // Is occupied
            tile.piece?.playerId === "player-1" ? 1 : tile.piece?.playerId === "player-2" ? 2 : 0 // Player ID or 0 if none
        ])
    );
};

/**
 * Decodes the simplified version back to the original board structure.
 */
export const decodeBoardState = (simplifiedBoard: number[][][]): BoardStateType => {
    return simplifiedBoard.map((row, rowIndex) =>
        row.map(([playable, occupied, playerId], colIndex) => {
            const square: SquareType = {
                coordinates: [rowIndex, colIndex],
                playable: !!playable
            };

            if (occupied) {
                square.occupied = true;
                square.piece = {
                    type: "man", // Default type can be set here or modified according to the original data
                    color: playerId === 1 ? "grey" : playerId === 2 ? "blue" : "none",
                    playerId: playerId === 1 ? "player-1" : playerId === 2 ? "player-2" : undefined
                };
            }

            return square;
        })
    ) as BoardStateType;
};