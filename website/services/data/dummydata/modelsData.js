export const model1_data = [
    {
      batchSize: 64,
      dataset: "PreprocessedData",
      epochs: 10,
      learningRate: null,
      lossFunction: null,
      modelName: "RegModel",
      optimizer: null,
      structure: null
    }
  ]

  export const model2_data = [
    {
      batchSize: 64,
      dataset: "PreprocessedData",
      epochs: 5,
      learningRate: 0.001,
      lossFunction: "MAE",
      modelName: "SavedModel",
      optimizer: "adam",
      structure: null
    }
  ]

export const model3_data = [
    {
      batchSize: 128,
      dataset: "PreprocessedData",
      epochs: 3,
      learningRate: 0.001,
      lossFunction: "mean_absolute_error",
      modelName: "SavedModel4",
      optimizer: "Adam",
      structure: "Model: \"sequential\"\n_________________________________________________________________\n Layer (type)                Output Shape              Param #   \n=================================================================\n dense (Dense)               (None, 20)                1700      \n                                                                 \n dense_1 (Dense)             (None, 80)                1680      \n                                                                 \n dense_2 (Dense)             (None, 140)               11340     \n                                                                 \n dense_3 (Dense)             (None, 60)                8460      \n                                                                 \n dense_4 (Dense)             (None, 10)                610       \n                                                                 \n dense_5 (Dense)             (None, 1)                 11        \n                                                                 \n=================================================================\nTotal params: 23,801\nTrainable params: 23,801\nNon-trainable params: 0\n_________________________________________________________________\n"
    }
  ]

export const model4_data = [
    {
      batchSize: 64,
      dataset: "PreprocessedData",
      epochs: 10,
      learningRate: 0.001,
      lossFunction: "mean_absolute_error",
      modelName: "SavedModel5",
      optimizer: "Adam",
      structure: "Model: \"sequential\"\n_________________________________________________________________\n Layer (type)                Output Shape              Param #   \n=================================================================\n dense (Dense)               (None, 20)                1700      \n                                                                 \n dense_1 (Dense)             (None, 80)                1680      \n                                                                 \n dense_2 (Dense)             (None, 140)               11340     \n                                                                 \n dense_3 (Dense)             (None, 60)                8460      \n                                                                 \n dense_4 (Dense)             (None, 10)                610       \n                                                                 \n dense_5 (Dense)             (None, 1)                 11        \n                                                                 \n=================================================================\nTotal params: 23,801\nTrainable params: 23,801\nNon-trainable params: 0\n_________________________________________________________________\n"
    }
  ]