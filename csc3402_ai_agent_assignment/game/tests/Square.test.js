import { Square } from "../game_engine/src/models/board"
// Import the Square class

// Test Suite for Square class
describe('Square', () => {
    // Test case to check if the Square is constructed correctly
    test('should create a Square with the correct id', () => {
        // Arrange: Create a new Square instance with a specific id
        const id = 'square-1';
        const square = new Square(id);

        // Assert: Check if the id is correctly assigned
        expect(square.id).toBe(id);
    });

    // Test case to check if pieceId is undefined initially
    test('should have undefined pieceId initially', () => {
        // Arrange: Create a new Square instance
        const square = new Square('square-2');

        // Assert: Check if pieceId is undefined
        expect(square.pieceId).toBeUndefined();
    });
});
