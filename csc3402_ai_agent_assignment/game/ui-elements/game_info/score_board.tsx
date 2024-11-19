'use client'

import { useSelector } from "react-redux";

export default function ScoreBoard() {
    let playersState = useSelector(state => state.players)
    let playersList = playersState.players
    //let currentPlayerName = playersList[playersState.currentPlayerIndex].playerName
    let player1 = playersList[0]
    let player2 = playersList[1]

    return(
        <div>
            <span>{player1.playerName} : {player1.score}</span>
            &nbsp;    |   &nbsp;
            <span>{player2.score} : {player2.playerName}</span>
        </div>
    )
}