'use client'

import { useSelector } from "react-redux";
import { player2Id } from "@/contants";
import { encodBoardState, decodeBoardState /* simplifyBoardState, encodeForML, decodeFromML, unsimplifyBoardState */ } from "@/util/board_state_util";
import { dataset } from "@/ML Data/ml_data";
import { BoardStateType } from "@/types/board_state_type";

export default function DataSetLogger() {
    let playersState = useSelector(state => state.players)
    let boardState = useSelector(state => state.board)

    let currentPlayerIndex = playersState.currentPlayerIndex
    let player2State = playersState.players[currentPlayerIndex] // {"playerId":"player-2","playerName":"Player 2","turn":true,"score":0}
    let player2Turn = player2State.playerId == player2Id

    let resultingBoardState:string = ""
    let currentBoardState:string = ""

    let stringifiedBoardState = JSON.stringify(boardState.current)

    let message:string

    if (player2Turn) {
        // log the before-state data sample
        currentBoardState = stringifiedBoardState
        // alert(`Player 2's turn. \ncurrent board state: \n\n ${JSON.stringify(currentBoardState)}`)
        message = "Player 2's turn. \ncurrent board state:\n\n"
    } else {
        // log the after-state data sample
        // Ignore the first time
        resultingBoardState = stringifiedBoardState
        // alert(`Player 1's turn. \nresulting board state: \n\n ${JSON.stringify(resultingBoardState)}`)
        message = "Please ignore the first time\n\n.Player 1's turn. \nresulting board state: \n\n"
    }

    // alert(JSON.stringify(playersState))



    /*
    let simplifedBoardState = simplifyBoardState(boardState.current)
    let encodedBoardState = encodeForML(simplifedBoardState)

    let decodedBoardState = decodeFromML(encodedBoardState)
    let unsimplifiedBoardState = unsimplifyBoardState(decodedBoardState)

    */

    // let encodedBoardState = encodBoardState(boardState.current)

    // let decodedBoardState = decodeBoardState(encodedBoardState)

    let encodedDataset = [];

    dataset.forEach(item => {
        // Access 'label', 'score', and 'state'
        const label = item.label;
        const score = item.features.score;
        const state = item.features.state;

        let newEntry = {
            "label": encodBoardState(label as BoardStateType),
            "features": {
                "score": score,
                "state": encodBoardState(state as BoardStateType)
            }
        }
        encodedDataset.push(newEntry)
    });



    return (
        
        <div>
            





            <div className="space-small"></div>
            <div className="space-small"></div>
            <div className="space-small"></div>
            <div className="space-small"></div>

            <div>
                <p>full encoded dataset</p>
                {
                   JSON.stringify(encodedDataset)
                }
            </div>

            
        </div>
    )
}


/*
<div>
                { message }
            </div>
            <div>
                {resultingBoardState.length > 0 ? resultingBoardState : currentBoardState}
            </div>

            <div className="space-small"></div>
            <div className="space-small"></div>
            <div className="space-small"></div>
            <div className="space-small"></div>

            <div>
                <p>encoded</p>
                {JSON.stringify(encodedBoardState)}
            </div>

            <div className="space-small"></div>
            <div className="space-small"></div>
            <div className="space-small"></div>
            <div className="space-small"></div>

            <div>
                <p>decoded</p>
                {JSON.stringify(decodedBoardState)}
            </div>


*/