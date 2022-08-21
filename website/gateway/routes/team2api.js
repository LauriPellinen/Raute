import express from "express";
import dotenv from "dotenv";
import axios from "axios";
export const router = express.Router();
import { isAuth } from "../lib/protected.js";

dotenv.config();


/**
* -------------- GET ROUTES ----------------
* "/team2api/modelNames"
* "/team2api/models/:modelName"
* "/team2api/results/simple/:modelName"
* "/team2api/results/train/:modelName"
* "/team2api/results/test/:modelName"
* "/team2api/Model/info/:modelName"
* "/team2api/datasetNames"
* "/team2api/model/state/:modelName"
*/


router.get("/team2api/modelNames", isAuth, (req, res) => {

  // Send HTTP-GET request to DATA-container
  let getModelNames = axios({
    method: "get",
    url: process.env.DATA + "modelNames",
  });

  /* response.data
  [
    { modelName: "model1" },
    { modelName: "model2"},
    ...
  ]
  */
  return getModelNames
    .then((response) => {
      return res.send(response.data);
    })
    .catch(err => {
      console.log("error in GET route /team2api/modelNames | ", err.message);

      // Logataan potentiaalinen errori
      axios({
        method: "post",
        data: {
          activity: `Encountered Error, when fetching models: ${err.message}`
        },
        url: process.env.CONSOLE + 'add_activity'
      });

      return res.status(500).send({ message: "Failed fetching" });
    });
});


router.get("/team2api/models/:modelName", isAuth, (req, res) => {

  let getModelData = axios({
    method: "get",
    url: process.env.DATA + `models/${req.params.modelName}`,
  });


  /* response.data 
  
  [
    {
      batchSize: 64,
      dataset: "Augmented4",
      epochs: 10,
      learningRate: null,
      lossFunction: null,
      modelName: "RegModel",
      optimizer: null,
      structure: null
    }
  ]
  */
  return getModelData
    .then((response) => {
      return res.send({
        batchSize: response.data[0]['batchSize'],
        dataset: response.data[0]['dataset'],
        epochs: response.data[0]['epochs'],
        learningRate: response.data[0]['learningRate'],
        lossFunction: response.data[0]['lossFunction'],
        modelName: response.data[0]['modelName'],
        optimizer: response.data[0]['optimizer'],
        structure: response.data[0]['structure']
      });
    })
    .catch(err => {

      // Logataan potentiaalinen errori
      axios({
        method: "post",
        data: {
          activity: `Encountered Error, when fetching ${req.params.modelName}: ${err.message}`
        },
        url: process.env.CONSOLE + 'add_activity'
      });

      console.log("error in GET route /team2api/models/:modelName | ", err.message);
      return res
        .status(500)
        .send({ message: "Failed fetching, no model found?" });
    });
});

router.get("/team2api/results/simple/:modelName", isAuth, (req, res) => {

  let getModelResultSimple = axios({
    method: "get",
    url: process.env.DATA + `results/simple/${req.params.modelName}`,
  });

  /* response.data
    [
      {
        "timestamp": "Thu, 25 Nov 2021 10:14:39 GMT",
        "trainAcc": 0,
        "trainLoss": 3748.76,
        "validationAcc": 0,
        "validationLoss": 0
      },
      {
        "timestamp": "Thu, 25 Nov 2021 10:14:42 GMT",
        "trainAcc": 0,
        "trainLoss": 385.451,
        "validationAcc": 0,
        "validationLoss": 0
      }
    ]
  */

  // response.data can be empty []
  return getModelResultSimple
    .then((response) => {
      return res.send(response.data);
    })
    .catch(err => {

      // Logataan potentiaalinen errori
      axios({
        method: "post",
        data: {
          activity: `Encountered Error, when fetching ${req.params.modelName}: ${err.message}`
        },
        url: process.env.CONSOLE + 'add_activity'
      });

      console.log("error in GET route /team2api/results/simple/:modelName | ", err.message);
      return res.status(500).send({ message: "Failed fetching" });
    });
});


router.get("/team2api/results/train/:modelName", isAuth, (req, res) => {

  let getModelResultTrain = axios({
    method: "get",
    url: process.env.DATA + `results/train/${req.params.modelName}`,
  });


  /* response.data
    
  [
    {
      "badImage": "20210505133009_20.datx",
      "batchNum": null,
      "checkpointPath": "/raute_data/TrainingData/Models/Checkpoints/SavedModel/ckpt/Training/SavedModel",
      "epochs": 1,
      "goodImage": "20210505145802_50.datx",
      "keepResults": 1,
      "modelName": "SavedModel",
      "timestamp": "Thu, 25 Nov 2021 10:14:39 GMT",
      "trainAcc": 0,
      "trainLoss": 3748.76,
      "validationAcc": 0,
      "validationLoss": 0
    },
    ...
  ]
    
  */

  return getModelResultTrain
    .then((response) => {
      return res.send(response.data);
    })
    .catch((err) => {
      // Logataan potentiaalinen errori
      axios({
        method: "post",
        data: {
          activity: `Encountered Error, when training ${req.params.modelName}: ${err.message}`
        },
        url: process.env.CONSOLE + 'add_activity'
      });

      console.log("error in GET route /team2api/results/train/:modelName | ", err.message);
      return res.status(500).send({ message: "Failed fetching" });
    });
});



router.get("/team2api/results/test/:modelName", isAuth, (req, res) => {

  let getModelResultTest = axios({
    method: "get",
    url: process.env.DATA + `results/test/${req.params.modelName}`,
  });

  /* response.data 
  [
    {
      "badImage": null,
      "checkpointPath": "/raute_data/TrainingData/Models/Checkpoints/SavedModel/ckpt/Testing/SavedModel",
      "epochs": 10,
      "goodImage": null,
      "modelName": "SavedModel",
      "testAcc": 0,
      "testLoss": 0,
      "timestamp": "Thu, 25 Nov 2021 10:14:58 GMT"
    },
    ...
  ]
  
  */
  return getModelResultTest
    .then((response) => {
      return res.send(response.data);
    })
    .catch((err) => {

      // Logataan potentiaalinen errori
      axios({
        method: "post",
        data: {
          activity: `Encountered Error, when testing ${req.params.modelName}: ${err.message}`
        },
        url: process.env.CONSOLE + 'add_activity'
      });

      console.log("error in GET route /team2api/results/test/:modelName | ", err.message);

      return res.status(500).send({ message: "Failed fetching" });
    });
});

router.get("/team2api/Model/Info/:modelName", isAuth, (req, res) => {

  let getModelInfo = axios({
    method: "get",
    url: process.env.DATA + `Model/Info/${req.params.modelName}`,
  });

  /* response.data 
  [
    {
      "TotalEpochs": 0,
      "CurrentEpoch": 0,
      "GoodImage": "string",
      "BadImage": "string",
      "CurrentBatch": 0,
      "TotalBatch": 0,
      "TrainingLoss": 0,
      "ValidationLoss": 0,
      "TestLoss": 0
    }
  ]
  */
  return getModelInfo
    .then((response) => {
      if (typeof response.data == "string") {
        return res.status(404).send({ message: "Model not running" })
      } else {
        return res.send(response.data);
      }

    })
    .catch(err => {
      // Logataan potentiaalinen errori
      axios({
        method: "post",
        data: {
          activity: `Encountered Error, when testing ${req.params.modelName}: ${err.message}`
        },
        url: process.env.CONSOLE + 'add_activity'
      });

      console.log("error in GET route /team2api/Model/info/:modelName | ", err.message);

      return res.status(500).send({ message: "Failed fetching" });
    });
});

router.get("/team2api/datasetNames", isAuth, (req, res) => {

  let datasetNames = axios({
    method: "get",
    url: process.env.DATA + "datasetNames",
  });

  /* response.data 
  [
    {
      "datasetName": "PreprocessedData"
    },
    {
      "datasetName": "PreprocessedData1"
    },
    {
      "datasetName": "PreprocessedDataNew"
    }
  ]
  */
  return datasetNames
    .then((response) => {
      return res.send(response.data);
    })
    .catch(err => {
      // Logataan potentiaalinen errori
      axios({
        method: "post",
        data: {
          activity: `Encountered Error, ${err.message}`
        },
        url: process.env.CONSOLE + 'add_activity'
      });

      console.log("error in GET route /team2api/datasetNames | ", err.message);

      return res.status(500).send({ message: "Failed fetching datasetNames" });
    });
});

router.get("/team2api/model/state/:modelName", isAuth, (req, res) => {

  let getModelState = axios({
    method: "get",
    url: process.env.DATA + `Model/state/${req.params.modelName}`,
  });

  /* response.data 
  [
    {
      state: 0
    }
  ]
  */
  return getModelState
    .then((response) => {
        return res.send(response.data);
    })
    .catch(err => {
      // Logataan potentiaalinen errori
      axios({
        method: "post",
        data: {
          activity: `Encountered Error, ${err.message}`
        },
        url: process.env.CONSOLE + 'add_activity'
      });

      console.log("error in GET route /team2api/model/state/:modelName | ", err.message);

      return res.status(500).send({ message: "Failed fetching datasetNames" });
    });
});


router.get("/team2api/Model/StopGracefull/:modelName", isAuth, (req, res) => {

  let stopGracefull = axios({
    method: "get",
    url: process.env.DATA + `Model/StopGracefull/${req.params.modelName}`,
  });

  return stopGracefull
    .then((response) => {
      return res.send(response.data);
    })
    .catch(err => {
      // Logataan potentiaalinen errori
      axios({
        method: "post",
        data: {
          activity: `Encountered Error, when fetching models: ${err.message}`
        },
        url: process.env.CONSOLE + 'add_activity'
      });

      console.log("error in get route /team2api/Model/StopGracefull/:modelName | ", err.message);

      return res.status(500).send({ message: "error occured while stopping model" });
    });
});


router.get("/team2api/results/train_good_and_bad_image/:modelName", isAuth, (req, res) => {
  let stopGracefull = axios({
    method: "get",
    url: process.env.DATA + `results/train_good_and_bad_image/${req.params.modelName}`,
  });

  return stopGracefull
    .then((response) => {
      return res.send(response.data);
    })
    .catch(err => {
      // Logataan potentiaalinen errori
      axios({
        method: "post",
        data: {
          activity: `Encountered Error, when fetching sheet pictures: ${err.message}`
        },
        url: process.env.CONSOLE + 'add_activity'
      });

      console.log("error in get route /results/train_good_and_bad_image/:modelName | ", err.message);

      return res.status(500).send({ message: "error occured while fetching sheet picture, Osa 2." });
    });
});



/**
* -------------- POST ROUTES ----------------
* "/team2api/Init"
*/


router.post("/team2api/init/:modelName", isAuth, (req, res) => {

  let initModel = axios({
    method: "post",
    data: {
      BatchSize: req.body.batchSize,
      Epochs: req.body.Epochs,
      ModelName: req.body.ModelName,
      Dataset: req.body.Dataset
    },
    url: process.env.DATA + `Model/Init`,
  });

  return initModel
    .then((response) => {
      console.log(response.data);
      return res.status(200).send({ message: "Training started" });
    })
    .catch((err) => {
      // Logataan potentiaalinen errori
      axios({
        method: "post",
        data: {
          activity: `Encountered Error, ${err.message}`
        },
        url: process.env.CONSOLE + 'add_activity'
      });

      console.log("error in POST route /team2api/init/:modelName | ", err.message);

      return res.status(500).send({ message: "Failed fetching datasetNames" });
    });
});





/**
* -------------- PUT ROUTES ----------------
* "/team2api/Model/Update"
*/


router.put("/team2api/Model/Update", isAuth, (req, res) => {

  let updateModel = axios({
    method: "put",
    data: {
      BatchSize: req.body.batchSize,
      Epochs: req.body.Epochs,
      ModelName: req.body.ModelName,
      Dataset: req.body.Dataset
    },
    url: process.env.DATA + `Model/UpdateInformation`,
  });

  return updateModel
    .then((response) => {
      console.log(response.data);
      return res.status(200).send({ message: "Training started" });
    })
    .catch((err) => {
      // Logataan potentiaalinen errori
      axios({
        method: "post",
        data: {
          activity: `Encountered Error, ${err.message}`
        },
        url: process.env.CONSOLE + 'add_activity'
      });

      console.log("error in PUT route /team2api/Model/Update | ", err.message);

      return res.status(500).send({ message: "Failed fetching datasetNames" });
    });
});
