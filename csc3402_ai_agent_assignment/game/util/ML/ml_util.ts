const trainingData = [
    {
        input: simplifyBoardState(validBoardState),
        output: [1]  // Valid move
    },
    {
        input: simplifyBoardState(invalidBoardState),
        output: [0]  // Invalid move
    }
];
