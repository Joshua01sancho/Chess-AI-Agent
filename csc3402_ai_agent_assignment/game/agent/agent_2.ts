import { BoardStateType } from "@/types/board_state_type";
import SquareType from "@/types/square_type";
import PieceType from "@/types/piece_type";
import { isDiagonalMove, isForwardMove, isSingleSquareMove, isValidCaptureMove, promoteToKing } from "@/util/game_play_rules_util";
import { updateBoard } from "@/redux/boardSlice";
import { updateMessage } from "@/redux/messageSlice";
import { updateScore, switchTurn } from "@/redux/playersSlice";
import { player1Id, player2Id } from "@/contants";

// AI agent for Player 2
export function aiMakeMove(board: BoardStateType, dispatch: any) {
    const boardSize = board.length;

    let possibleMoves: { from: SquareType, to: SquareType, capture: boolean }[] = [];

    // Loop through each square to find Player 2's pieces
    board.forEach((row, rowIndex) => {
        row.forEach((square, colIndex) => {
            const piece = square.piece;
            if (piece && piece.playerId === player2Id) {
                // Loop through diagonal directions to find valid moves
                const directions = [
                    [-1, -1], [-1, 1], [1, -1], [1, 1], // Diagonal directions
                ];

                directions.forEach(([rowDelta, colDelta]) => {
                    const newRow = rowIndex + rowDelta;
                    const newCol = colIndex + colDelta;

                    if (newRow >= 0 && newRow < boardSize && newCol >= 0 && newCol < boardSize) {
                        const targetSquare = board[newRow][newCol];

                        // Check if it's a valid move
                        if (!targetSquare.occupied && isDiagonalMove(square, targetSquare)) {
                            if (isForwardMove(square, targetSquare, piece) || piece.type === "king") {
                                if (isSingleSquareMove(square, targetSquare) || piece.type === "king") {
                                    possibleMoves.push({ from: square, to: targetSquare, capture: false });
                                }
                            }
                        }

                        // Check for capture move
                        const captureRow = rowIndex + 2 * rowDelta;
                        const captureCol = colIndex + 2 * colDelta;
                        if (captureRow >= 0 && captureRow < boardSize && captureCol >= 0 && captureCol < boardSize) {
                            const captureTargetSquare = board[captureRow][captureCol];
                            if (!captureTargetSquare.occupied && isValidCaptureMove(square, captureTargetSquare, board, piece)) {
                                possibleMoves.push({ from: square, to: captureTargetSquare, capture: true });
                            }
                        }
                    }
                });
            }
        });
    });

    // If there are capture moves, prioritize them
    const captureMoves = possibleMoves.filter(move => move.capture);
    const selectedMove = captureMoves.length > 0 ? captureMoves[0] : possibleMoves[0];

    if (selectedMove) {
        // Perform the move
        performAIMove(selectedMove.from, selectedMove.to, board, dispatch);
    } else {
        dispatch(updateMessage("AI has no valid moves. You win!"));
    }
}

// Function to perform the AI move and update the board state
function performAIMove(from: SquareType, to: SquareType, board: BoardStateType, dispatch: any) {
    const boardSize = board.length;

    const fromRow = from.coordinates[0];
    const fromCol = from.coordinates[1];
    const toRow = to.coordinates[0];
    const toCol = to.coordinates[1];

    const piece = from.piece;

    if (piece) {
        const updatedBoardState: BoardStateType = board.map(row => row.map(square => ({ ...square }))) as BoardStateType

        // If it's a capture move, remove the jumped piece
        if (Math.abs(fromRow - toRow) === 2) {
            const middleRow = (fromRow + toRow) / 2;
            const middleCol = (fromCol + toCol) / 2;
            updatedBoardState[middleRow][middleCol].piece = undefined;
            updatedBoardState[middleRow][middleCol].occupied = false;

            dispatch(updateScore({ playerId: player2Id, increment: 1 }));
        }

        // Perform the move
        updatedBoardState[toRow][toCol].piece = { ...piece };
        updatedBoardState[toRow][toCol].occupied = true;
        updatedBoardState[fromRow][fromCol].piece = undefined;
        updatedBoardState[fromRow][fromCol].occupied = false;

        // Check for promotion to king
        let newBoardState = promoteToKing(updatedBoardState[toRow][toCol], piece, updatedBoardState);

        // Dispatch the updated board state
        dispatch(updateBoard(newBoardState));
        dispatch(updateMessage("AI move completed successfully."));
        dispatch(switchTurn());
    }
}
