'use client'

// import ScreenHeader from "./screen_header";
import { generateBoardElementMatrix } from "@/util/board_util";
// import { sqrColor2 } from "@/contants";
// import { BoardStateType } from "@/types/board_state_type";
// import Square from "./square";
import { useSelector } from "react-redux";

export default function Board() {
    const boardState = useSelector(state => state.board.current)
    // console.log("\n\nCurrent state from board element: ", boardState, "\n\n")
    // logToFile(boardState)

    return (
        <div className="board">
            
            {
               generateBoardElementMatrix(boardState).map((sqrRow, index) => (
                <div key={index} className="square-row">
                    {
                        sqrRow.map((sqr) => (
                            sqr
                        ))
                    }
                </div>
               ))
               
               
               /*
                initialState.map((sqrList, index) => (
                    <div key={index} className="square-row">
                        {
                            sqrList.map((squareState, index) => (
                                <Square 
                                    id={`square-${index}`}
                                    key={index}
                                    onlick={() => {
                                        alert(`square-${index} got clicked`)
                                    }}
                                    initialState={squareState}
                                />
                            ))
                        }
                    </div>
                ))
                */
            }
            
            {
                // JSON.stringify(boardState)
            }
        </div>
    );
}