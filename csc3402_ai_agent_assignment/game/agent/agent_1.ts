import { BoardStateType } from '@/types/board_state_type';
import PieceType from '@/types/piece_type';
import { sqrColor1, sqrColor2, pieceColor1, pieceColor2, player1Id, boardSquareConfigCount, player2Id } from '@/contants';

// Check if a square is within the board boundaries
const isValidPosition = (row: number, col: number): boolean => {
    return row >= 0 && row < boardSquareConfigCount && col >= 0 && col < boardSquareConfigCount;
};

// Check if the square is playable (i.e., black square) and empty
const isPlayableAndEmpty = (board: BoardStateType, row: number, col: number): boolean => {
    return board[row][col] && board[row][col].playable == true && board[row][col].occupied == false;
};

// Check if a move is a capture move (jumping over an opponent piece)
const isCaptureMove = (board: BoardStateType, row: number, col: number, opponentRow: number, opponentCol: number): boolean => {
    if (!isValidPosition(row, col) || !isValidPosition(opponentRow, opponentCol)) return false;

    const opponentPiece = board[opponentRow][opponentCol];
    const destinationSquare = board[row][col];

    // Check if opponent piece is present and the destination is empty and playable
    return (
        opponentPiece &&
        opponentPiece.piece.playerId == player1Id && // player 1's grey piece
        destinationSquare &&
        destinationSquare.occupied == false
    );
};

// Get all possible moves for player 2 (blue pieces)
const getAllValidMoves = (board: BoardStateType): { from: [number, number], to: [number, number] }[] => {
    const moves: { from: [number, number], to: [number, number] }[] = [];

    for (let row = 0; row < boardSquareConfigCount; row++) {
        for (let col = 0; col < boardSquareConfigCount; col++) {
            const piece = board[row][col].piece;

            // Check if it's a blue piece (player 2)
            if (piece && piece.color === pieceColor2 && piece.playerId == player2Id) {
                // Diagonal movement for a regular piece (forward-down diagonals)
                const possibleMoves = [
                    [row + 1, col - 1], // down-left
                    [row + 1, col + 1]  // down-right
                ];

                for (const [newRow, newCol] of possibleMoves) {
                    if (isValidPosition(newRow, newCol) && isPlayableAndEmpty(board, newRow, newCol)) {
                        moves.push({ from: [row, col], to: [newRow, newCol] });
                    }
                }
            }
        }
    }

    return moves;
};

// Get all capture moves for player 2
const getAllCaptureMoves = (board: BoardStateType): { from: [number, number], to: [number, number] }[] => {
    const captureMoves: { from: [number, number], to: [number, number] }[] = [];

    for (let row = 0; row < boardSquareConfigCount; row++) {
        for (let col = 0; col < boardSquareConfigCount; col++) {
            const piece = board[row][col];

            // Check if it's a blue piece (player 2)
            if (piece && piece.color === pieceColor2 && piece.playerId === "2") {
                // Diagonal capture options
                const possibleCaptureMoves = [
                    { to: [row + 2, col - 2], over: [row + 1, col - 1] },  // down-left capture
                    { to: [row + 2, col + 2], over: [row + 1, col + 1] }   // down-right capture
                ];

                for (const move of possibleCaptureMoves) {
                    const [newRow, newCol] = move.to;
                    const [overRow, overCol] = move.over;

                    if (isCaptureMove(board, newRow, newCol, overRow, overCol)) {
                        captureMoves.push({ from: [row, col], to: [newRow, newCol] });
                    }
                }
            }
        }
    }

    return captureMoves;
};

// AI function for player 2 (blue) to make a move
const aiPlayer2Move = (board: BoardStateType): { from: [number, number], to: [number, number] } | null => {
    // Get all possible capture moves
    const captureMoves = getAllCaptureMoves(board);

    if (captureMoves.length > 0) {
        // Prioritize capture moves
        return captureMoves[Math.floor(Math.random() * captureMoves.length)];
    }

    // If no captures are available, get all valid non-capture moves
    const validMoves = getAllValidMoves(board);

    if (validMoves.length > 0) {
        // Pick a random valid move
        return validMoves[Math.floor(Math.random() * validMoves.length)];
    }

    // If no moves are available, return null
    return null;
};

// Example usage
const boardState: BoardStateType = // your current board state
const aiMove = aiPlayer2Move(boardState);

if (aiMove) {
    console.log(`AI moves from ${aiMove.from} to ${aiMove.to}`);
    // Perform the move on the board
} else {
    console.log('No valid moves available for AI.');
}


/* 
Old code 1:


let aiMakeMove = (board: BoardStateType, dispatch: any) => {
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
           let updatedBoardState: BoardStateType = performAIMove(selectedMove.from, selectedMove.to, board, dispatch);
           
           if (updatedBoardState) {
               // handleRefresh(updatedBoardState)
               handleRefresh(updatedBoardState)
           }
           // refresh this to get new state
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

        if (piece?.playerId != player2Id) {
            // performAIMove(from, to, board, dispatch)
            return null
        }

        if (piece) {
            // Switch turns in advance to avoid further play by agent
            dispatch(switchTurn());

            const updatedBoardState: BoardStateType = board.map(row => row.map(square => ({ ...square })));

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
            promoteToKing(updatedBoardState[toRow][toCol], piece, boardSize);

            // Dispatch the updated board state
            dispatch(updateBoard(updatedBoardState));
            dispatch(updateMessage("AI move completed successfully."));

            return updatedBoardState
        }

        return null
    }

    let aiAgentPlay = () => {
        setTimeout(() => {
            aiMakeMove(board, dispatch);
        }, 1000)
    }

    if (currentPlayer.playerId == player2Id) {
        aiAgentPlay()
    }

*/