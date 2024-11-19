'use client'

import { useSelector } from "react-redux";

export default function PlayerTurnIndicator() {
    let playersState = useSelector(state => state.players)
    let playersList = playersState.players
    let currentPlayerName:string = playersList[playersState.currentPlayerIndex].playerName

    let component = <></>

    if (currentPlayerName.length != 0) {
        component = <div>
            <p>{currentPlayerName}'s turn to play.</p>
        </div>
    }

    return component
}