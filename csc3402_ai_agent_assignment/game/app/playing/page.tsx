'use client'

import Board from "@/ui-elements/board";
import InfoBar from "@/ui-elements/game_info/info_bar";
import DataSetLogger from "@/ui-elements/data_set_logger";

export default function PlayingPage() {
    return (
        <>
            <div className="flex items-center justify-center w-screen h-fit pv-4 sticky-top bg-blur">
                <InfoBar />
            </div>
            <div className="flex items-center justify-center h-screen bg-gray-800 mt-36">
                <Board />
            </div>
            
            <div className="space-small"></div>
            <div className="space-small"></div>
            <div className="space-small"></div>
            <div className="space-small"></div>
            <div className="space-small"></div>
            <div className="space-small"></div>
            <div className="space-small"></div>
            <div className="space-small"></div>
            <div className="space-small"></div>
            <div className="space-small"></div>
            <div className="space-small"></div>
            <div className="space-small"></div>
            <div className="space-small"></div>
            <div className="space-small"></div>
            <div className="space-small"></div>
            <div className="space-small"></div>
            <div className="space-small"></div>
            <div className="space-small"></div>

            <div className="pv-4">
                <DataSetLogger />
            </div>
        </>
    );
}
