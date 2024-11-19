import * as tf from '@tensorflow/tfjs';
import { encodedDataset } from './ml_data';

// Encoding the 2D game state to a flattened array
const encodeGameState = (state) => {
    return state.flat(2);
};

// Decoding the prediction into a move (here, let's assume classification)
const decodeMove = (prediction) => {
    return tf.argMax(prediction, 1).dataSync();
};

// Build the model
const buildModel = () => {
    const model = tf.sequential();

    // Input layer (flattened game state as input)
    model.add(tf.layers.dense({
        inputShape: [100],  // Assuming a 10x10 board flattened
        units: 128,
        activation: 'relu'
    }));

    // Hidden layer
    model.add(tf.layers.dense({
        units: 64,
        activation: 'relu'
    }));

    // Output layer: number of possible moves (for classification)
    model.add(tf.layers.dense({
        units: 10, // Assuming 10 possible moves
        activation: 'softmax'
    }));

    // Compile the model
    model.compile({
        optimizer: 'adam',
        loss: 'categoricalCrossentropy',
        metrics: ['accuracy']
    });

    return model;
};

// Prepare training data
const prepareData = (dataset) => {
    const inputs = [];
    const labels = [];

    dataset.forEach(data => {
        const encodedState = encodeGameState(data.features.state);  // Flatten the game state
        const label = data.label.flat(2);  // Assuming you want to flatten the label for training

        inputs.push(encodedState);
        labels.push(label);
    });

    // Convert the data to tensors
    const inputTensor = tf.tensor2d(inputs);
    const labelTensor = tf.tensor2d(labels);

    return { inputTensor, labelTensor };
};

// Train the model
const trainModel = async (model, inputs, labels) => {
    const history = await model.fit(inputs, labels, {
        epochs: 10,
        batchSize: 32,
        shuffle: true,
        validationSplit: 0.2
    });

    console.log('Training Complete');
    console.log(history);
};

// Main function to load dataset, build, and train the model
const trainGameModel = async () => {
    const dataset = encodedDataset;

    const { inputTensor, labelTensor } = prepareData(dataset);

    const model = buildModel();

    await trainModel(model, inputTensor, labelTensor);

    // console.log("Done training the model. Now saving")
    // Save the model after training
    // await model.save('localstorage://game-model');
    await model.save('file://./models/trained-model');
};

// Call the main function to start training
// trainGameModel();
