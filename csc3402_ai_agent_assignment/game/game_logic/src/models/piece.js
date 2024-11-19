// Piece.js

class Piece {
    constructor(color, position) {
        this.color = color; // Color of the piece (e.g., 'black' or 'white')
        this.position = position; // Current position of the piece as [row, col]
    }

    // Method to check if a piece occupies a specific square
    occupies(squareId) {
        return this.position[0] === squareId[0] && this.position[1] === squareId[1];
    }

    // Method to check if the piece has any valid moves
    hasMoves(board) {
        // Assuming board is a 2D array representing the current game state
        const directions = this.color === 'black' ? [[1, -1], [1, 1]] : [[-1, -1], [-1, 1]];
        for (let direction of directions) {
            const [dx, dy] = direction;
            const newX = this.position[0] + dx;
            const newY = this.position[1] + dy;

            // Check if the new position is within bounds and empty
            if (this.isInBounds(newX, newY) && !board[newX][newY]) {
                return true; // Valid move found
            }
        }
        return false; // No valid moves found
    }

    // Method to return the possible moves for the piece
    moves(board) {
        const validMoves = [];
        const directions = this.color === 'black' ? [[1, -1], [1, 1]] : [[-1, -1], [-1, 1]];

        for (let direction of directions) {
            const [dx, dy] = direction;
            const newX = this.position[0] + dx;
            const newY = this.position[1] + dy;

            // Check if the new position is within bounds and empty
            if (this.isInBounds(newX, newY) && !board[newX][newY]) {
                validMoves.push([newX, newY]);
            }
        }

        return validMoves;
    }

    // Helper method to check if a position is within the board bounds
    isInBounds(x, y) {
        return x >= 0 && x < 8 && y >= 0 && y < 8;
    }
}

// Example usage
const board = Array(8).fill(null).map(() => Array(8).fill(null)); // Initialize an empty board
const piece = new Piece('black', [2, 3]); // Create a black piece at position [2, 3]

// Check if the piece occupies a specific square
console.log(piece.occupies([2, 3])); // true

// Check if the piece has valid moves
console.log(piece.hasMoves(board)); // true or false based on the board state

// Get possible moves for the piece
console.log(piece.moves(board)); // Returns an array of valid moves
