import Square from "../ui-elements/square"
import { sqrColor1, sqrColor2, boardSquareConfigCount, pieceColor1, pieceColor2, player1Id, player2Id } from "@/contants"
import { partialInitialBoardState } from "@/state/board_state"
import SquareType from "@/types/square_type"
import PieceType from "@/types/piece_type"
import { BoardStateType } from "@/types/board_state_type"
// import { ReplaceUpdateBoardSate } from "./board_state_util"


export function createBoardStateDeepCopy(boardState: BoardStateType): BoardStateType {
    return boardState.map(row => row.map(square => ({ ...square }))) as BoardStateType
}

export function generateInitialBoardState(): BoardStateType {
    let first = 0
    let last = 9 //boardSquareConfigCount - 1

    // Create a deep copy of the partialInitialBoardState
    // let boardState = partialInitialBoardState.map(row => row.map(square => ({ ...square })))
    let boardState = createBoardStateDeepCopy(partialInitialBoardState)

    let currentSquarePlayable = !boardState[first][first].playable

    for (let row = first; row <= last; row++) {
        let currentRow = boardState[row]
        for (let col = first; col <= last; col++) {
            if (row === first && col === first) {
                continue
            }

            let square: SquareType = { coordinates: [row, col], playable: currentSquarePlayable }

            if (currentSquarePlayable) {
                let piece: PieceType = {
                    type: "man",
                    color: pieceColor1,
                    playerId: player1Id
                }

                square.playable = true

                let rowsWithPieces = 4

                if (row < rowsWithPieces || row > last - rowsWithPieces) {
                    square.occupied = true
                    if (row > last - rowsWithPieces) {
                        piece.color = pieceColor2
                        piece.playerId = player2Id
                    }
                }

                if (square.occupied) {
                    square.piece = piece
                }
            } else {
                // square.piece = null
            }

            currentRow[col] = square
            currentSquarePlayable = !currentSquarePlayable
        }
        currentSquarePlayable = !currentSquarePlayable
    }

    return boardState as BoardStateType
}

/*
export function createBoardSquares(dimension: number, startColor: string) {
    let colors = {
        1: startColor,
        0: ""
    }
    if (startColor == sqrColor1) {
        colors[1] = sqrColor2
    } else {
        colors[0] = sqrColor1
    }

    let boardSquareMatrix = []

    let flag = false;

    let sqrCount = 1


    for (let i = 1; i <= dimension; i++) {
        let ithRow = []
        for (let j = 1; j <= dimension; j++) {
            console.log("flag is ", flag)
            ithRow.push(
                <Square
                    key={i * j}
                    id={`square-${sqrCount}`}
                    color={colors[Number(flag)]}
                    onlick={() => {
                        alert(`square-${sqrCount} just got clicked`)
                    }}
                    initialState={
                        {
                            occupied: true,
                            piece: {
                                type: "man",
                                color: colors[Number(!flag)]
                            }
                        }
                    }
                />
            )
            flag = !flag
            console.log("flag is now ", flag)
            sqrCount++
        }
        boardSquareMatrix.push(ithRow)
        flag = !flag
    }

    return boardSquareMatrix
}
*/

export function generateBoardElementMatrix(initialBoardState: BoardStateType) {
    let first = 0
    let last = initialBoardState.length - 1

    let idCount = 0

    let colors = {
        1: sqrColor1,
        0: sqrColor2
    }

    let boardMatrix = []


    for (let row = first; row <= last; row++) {
        let squareRow = []

        for (let col = first; col <= last; col++) {
            let squareState: SquareType = initialBoardState[row][col]
            idCount++
            squareRow.push(
                <Square
                    id={`square-${idCount}`}
                    key={idCount}
                    color={colors[Number(squareState.playable)]}
                    onlick={() => {
                        alert(`Now replacing board state.`)
                    }}
                    initialState={squareState}
                />
            )
        }
        boardMatrix.push(squareRow)
    }
    return boardMatrix
}
