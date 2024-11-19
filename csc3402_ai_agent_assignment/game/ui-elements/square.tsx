'use client'

import SquareType from "@/types/square_type";
import PieceType from "@/types/piece_type";
import Piece from "./piece";
import { useSelector, useDispatch } from "react-redux";
import { updateFromSquare, updateToSquare, fromSquareSelected, toSquareSelected, clearSquareSelections } from "@/redux/squareSlice";
import { updateBoard } from "@/redux/boardSlice";
import { BoardStateType } from "@/types/board_state_type";
import { isDiagonalMove, isForwardMove, isSingleSquareMove, isValidCaptureMove, promoteToKing } from "@/util/game_play_rules_util";
import { player1Id, player2Id, boardSquareConfigCount } from "@/contants";
// import { RootState } from "@/redux/store"; // Ensure you import the correct RootState type
import { updateMessage } from "@/redux/messageSlice";
import { switchTurn, updateScore } from "@/redux/playersSlice";
import { useEffect, useState } from 'react';
import { aiMakeMove } from "@/agent/agent_2";

/*
import { BoardStateType } from "@/types/board_state_type";
    import SquareType from "@/types/square_type";
    import PieceType from "@/types/piece_type";
    import { isDiagonalMove, isForwardMove, isSingleSquareMove, isValidCaptureMove, promoteToKing } from "@/util/game_play_rules_util";
    import { updateBoard, updateMessage, switchTurn, updateScore } from "@/redux/actions"; // Import necessary actions

    // AI agent for Player 2
    export function 
*/

export default function Square(props: { id: string, color: string, onClick: Function, initialState: SquareType, keyValue: number }) {
    let squaresState = useSelector((state /*: RootState*/) => state.squares);
    let boardState = useSelector((state /*: RootState*/) => state.board);
    let playersState = useSelector((state /*: RootState*/) => state.players); // Get the players information
    const dispatch = useDispatch();

    let currentBoardState: BoardStateType = boardState.current

    let playersList = playersState.players
    let currentPlayer = playersList[playersState.currentPlayerIndex]
    let currentPlayerName: string = currentPlayer.playerName

    let keyValue = props.keyValue ?? 0;
    let pieceInfo: PieceType = props.initialState.piece as PieceType;
    let piece = props.initialState.occupied ? <Piece info={pieceInfo} /> : <></>;

    const boardSize = boardSquareConfigCount;

    // const router = useRouter();

    const handleRefresh = (newBoardState: BoardStateType) => {
        dispatch(updateBoard(newBoardState));
        // router.replace(router.asPath); // Navigate to the same route without reloading the page
        window.location.hash = ''
    };

    /*
    const [board, setBoard] = useState(currentBoardState);

    useEffect(() => {
        const storedBoard = localStorage.getItem('board');
        if (storedBoard) {
            setBoard(JSON.parse(storedBoard));
        }
    }, []);

    const saveToLocalStorage = (board: BoardStateType) => {
        localStorage.setItem('board', JSON.stringify(board));
        setBoard(board);
    };

    */

    if (currentPlayer.playerId == player2Id) {
        aiMakeMove(currentBoardState, dispatch)
    }
    
    return (
        <div
            key={keyValue}
            id={props.id}
            className={`${props.color} w-8 h-8 square`}
            onClick={() => {


                if (!props.initialState.playable) {
                    alert("Invalid selection. The selected square is not playable.")
                    dispatch(clearSquareSelections());
                    return;
                }

                let pieceOnSquare = props.initialState.piece 

                if (pieceOnSquare != null && pieceOnSquare.playerId != currentPlayer.playerId) {
                    // Disallow play if selected piece does not belong to legal current player
                    alert(`Invalid. It is ${currentPlayerName}'s turn to play.`)
                    dispatch(clearSquareSelections());
                    return;
                }
            
                if (!squaresState.fromSquareSelected && !squaresState.toSquareSelected) {
                    // Select the source square
                    dispatch(updateFromSquare(props.initialState.coordinates));
                    dispatch(fromSquareSelected());
                    dispatch(updateMessage(`Source square selected by ${currentPlayerName}`))
                } else if (!squaresState.toSquareSelected && squaresState.fromSquareSelected) {
                    // Select the destination square
                    dispatch(updateToSquare(props.initialState.coordinates));
                    dispatch(toSquareSelected());
                    dispatch(updateMessage(`Destination square selected by ${currentPlayerName}.\nAttempting move...`));

                    let fromRow: number = squaresState.fromSquare[0];
                    let fromCol: number = squaresState.fromSquare[1];

                    let toRow: number = props.initialState.coordinates[0];
                    let toCol: number = props.initialState.coordinates[1];

                    let fromSqrOnBoard: SquareType = currentBoardState[fromRow][fromCol];
                    let toSqrOnBoard: SquareType = currentBoardState[toRow][toCol];

                    let piece = fromSqrOnBoard.piece;
                    if (!piece) {
                        alert("Invalid move. No piece on the source square.");
                        dispatch(clearSquareSelections());
                        return;
                    }

                    // Check if the destination square is valid (not occupied and playable)
                    if (!toSqrOnBoard.playable) {
                        alert("Invalid move. Destinations square is not playable.");
                        dispatch(clearSquareSelections());
                        return;
                    }

                    if (toSqrOnBoard.occupied) {
                        alert("Invalid move. Destinations square is already occupied.");
                        dispatch(clearSquareSelections());
                        return;
                    }

                    // Check movement rules for man and king
                    if (!isDiagonalMove(fromSqrOnBoard, toSqrOnBoard)) {
                        alert("Invalid move. You must move diagonally.");
                        dispatch(clearSquareSelections());
                        return;
                    }

                    if (piece.type === "man" && !isForwardMove(fromSqrOnBoard, toSqrOnBoard, piece)) {
                        alert("Invalid move. Man pieces can only move forward.");
                        dispatch(clearSquareSelections());
                        return;
                    }

                    // If a capture is possible, it should be prioritized
                    if (isValidCaptureMove(fromSqrOnBoard, toSqrOnBoard, currentBoardState, piece)) {
                        dispatch(updateMessage("Capture move detected! Jumping over an opponent."));
                        let updatedBoardState: BoardStateType = currentBoardState.map(row => row.map(square => ({ ...square }))) as BoardStateType

                        // Remove the opponent piece
                        const middleRow = (fromRow + toRow) / 2;
                        const middleCol = (fromCol + toCol) / 2;
                        updatedBoardState[middleRow][middleCol].piece = undefined;
                        updatedBoardState[middleRow][middleCol].occupied = false;

                        // Perform the move
                        updatedBoardState[toRow][toCol].piece = { ...piece };
                        updatedBoardState[toRow][toCol].occupied = true;
                        updatedBoardState[fromRow][fromCol].piece = undefined;
                        updatedBoardState[fromRow][fromCol].occupied = false;

                        // Check for promotion to king
                        let newBoardState = promoteToKing(updatedBoardState[toRow][toCol], piece, updatedBoardState);


                        // Dispatch the updated board state
                        dispatch(updateBoard(newBoardState));
                        dispatch(clearSquareSelections());

                        dispatch(updateMessage("Move and capture completed successfully."));
                        let currentPlayerId = currentPlayer.playerId
                        dispatch(updateScore({ playerId: currentPlayerId, increment: 1}))
                        dispatch(switchTurn())

                        // saveToLocalStorage(updatedBoardState)
                        
                        
                        // return;
                    } else {
                        // If no capture is possible, check if it is a valid forward move
                        if (piece.type === "man" && isSingleSquareMove(fromSqrOnBoard, toSqrOnBoard)) {
                            // Handle a valid single-square move forward for man pieces
                            let updatedBoardState: BoardStateType = currentBoardState.map(row => row.map(square => ({ ...square }))) as BoardStateType

                            // Perform the move
                            updatedBoardState[toRow][toCol].piece = { ...piece };
                            updatedBoardState[toRow][toCol].occupied = true;
                            updatedBoardState[fromRow][fromCol].piece = undefined;
                            updatedBoardState[fromRow][fromCol].occupied = false;

                            // Check for promotion to king
                            let newBoardState = promoteToKing(updatedBoardState[toRow][toCol], piece, updatedBoardState);


                            // Dispatch the updated board state
                            dispatch(updateBoard(newBoardState));
                            dispatch(clearSquareSelections());

                            dispatch(updateMessage("Move completed successfully."));
                            dispatch(switchTurn())

                            // saveToLocalStorage(updatedBoardState)

                            
                            // return;
                        } else if (piece.type === "king") {
                            // Handle king's movement (can move diagonally in any direction, single square)
                            let updatedBoardState: BoardStateType = currentBoardState.map(row => row.map(square => ({ ...square }))) as BoardStateType

                            // Perform the move
                            updatedBoardState[toRow][toCol].piece = { ...piece };
                            updatedBoardState[toRow][toCol].occupied = true;
                            updatedBoardState[fromRow][fromCol].piece = undefined;
                            updatedBoardState[fromRow][fromCol].occupied = false;

                            // Dispatch the updated board state
                            dispatch(updateBoard(updatedBoardState));
                            dispatch(clearSquareSelections());

                            dispatch(updateMessage("King's move completed successfully."));
                            dispatch(switchTurn())

                            // saveToLocalStorage(updatedBoardState)

                            
                            // return;
                        } else {
                            alert("Invalid move. Capture is required if available.");
                            dispatch(clearSquareSelections());
                            return;
                        }
                    }
                } else {
                    dispatch(clearSquareSelections());
                    alert("Selections cleared. Please start over.");
                }
            }}
        >
            {piece}
        </div>
    );
}
