'use client'

import { useSelector } from "react-redux";
import { initialMessage } from "@/redux/messageSlice";

export default function MessageBoard() {
    let messageObject = useSelector(state => state.message)
    let playersState = useSelector(state => state.players)

    let playersList = playersState.players
    let currentPlayerName: string = playersList[playersState.currentPlayerIndex].playerName
    
    return (
        <div>
            {
            messageObject.message == initialMessage ? 
                initialMessage + "\nThe grey pieces are " + currentPlayerName + "'s."+ "\nReady "+ currentPlayerName  +"?"
                : messageObject.message
            }
        </div>
    )
}