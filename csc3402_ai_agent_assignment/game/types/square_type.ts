import Piece from "./piece_type"

interface SquareType {
    playable: boolean,
    occupied?: boolean,
    piece?: Piece,
    coordinates: [number, number]
}

export default SquareType