/**
 * Square model.
 * Each square will keep id state of the piece occupying it.
 */


export class Square {
    /**
     * 
     * @param {*} id is the identifier of a square
     * @param {*} adjacencyMatrix is an array of ids of squares adjacent to this square
     */
    constructor(id, adjacencyMatrix) {
        this.id = id
        this.adjacencyMatrix = adjacencyMatrix
        this.pieceId
    }
}