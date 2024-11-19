'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from "react-redux";
import { setPlayerNames, resetGame } from "@/redux/playersSlice";

export default function StartGame() {
    const router = useRouter();
    const [player1Name, setPlayer1Name] = useState("");
    const [player2Name, setPlayer2Name] = useState("AI Agent");
    const [error, setError] = useState("");
    const dispatch = useDispatch();

    const handleStart = () => {
        dispatch(resetGame());

        if (player1Name === "") {
            setError("Using default player names...");
            // Navigate to the playing page
            setTimeout(() => { router.push('/playing'); }, 750)
        } else {
            setError("");
            // Store player names in local storage or state management
            // localStorage.setItem("player1", player1Name);
            // localStorage.setItem("player2", player2Name);

            dispatch(setPlayerNames({ player1Name, player2Name }));
            // Navigate to the playing page
            router.push('/playing');
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-900">
            <div className="text-center">
                <h1 className="text-5xl font-bold text-white mb-8">Enter Players' Names</h1>

                <div className="space-small"></div>
                <div className="space-small"></div>

                <div className="mb-4 p-2">
                    <input
                        type="text"
                        placeholder="optional Player 1 Name"
                        value={player1Name}
                        onChange={(e) => setPlayer1Name(e.target.value)}
                        className="px-4 py-2 w-64 text-lg rounded-md border border-gray-300 text-black"
                    />
                </div>
                <div className="space-small"></div>
                <div className="mb-4 p-2">
                    <input
                        type="text"
                        placeholder="AI agent default"
                        value={player2Name}
                        onChange={(e) => setPlayer2Name(e.target.value)}
                        className="px-4 py-2 w-64 text-lg rounded-md border border-gray-300 text-black"
                    />
                </div>

                <div className="space-small"></div>

                {error && <p className="text-red mb-4">{error}</p>}

                <div className="space-small"></div>

                <button
                    onClick={handleStart}
                    className="px-6 py-3 bg-blue-600 text-white text-lg rounded-md hover:bg-blue-700 transition-colors"
                >
                    Start Game
                </button>
            </div>
        </div>
    );
}
