import ScoreBoard from "./score_board";
import PlayerTurnIndicator from "./player_turn_indicator";
import MessageBoard from "./message_board";

export default function InfoBar() {
    return(
        <div className="pv-4 info-bar">
            <div className="space-small"></div>
            <ScoreBoard />
            <div className="space-small"></div>
            <div className="space-small"></div>
            <MessageBoard />
            <div className="space-small"></div>
            <PlayerTurnIndicator />
        </div>
    )
}