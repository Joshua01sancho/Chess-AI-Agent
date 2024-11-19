'use client'

export default function ScreenHeader() {
    return (
        <div className="screen-header">
            <span id="message-span" className="message-span">
                Some message here
            </span>
            <span id="controls-span" className="controls-span">
                <button
                    onClick={() => {
                        document.getElementById("message-span").innerText = "\nControl button was clicked!"
                    }}
                >Some control</button>
            </span>
        </div>
    )
}