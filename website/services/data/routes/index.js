import express from 'express';
import dotenv from 'dotenv'
export const router = express.Router();

import modelNames from '../dummydata/modelNames.js'
import { model1_info, model2_info, model3_info, model4_info } from '../dummydata/modelsInfo.js'
import { model1_result, model2_result, model3_result, model4_result } from '../dummydata/modelsResults.js'
import { model1_train, model2_train, model3_train, model4_train} from '../dummydata/modelsTrain.js'
import { model1_test, model2_test, model3_test, model4_test} from '../dummydata/modelsTest.js'
import datasetNames from '../dummydata/datasetname.js';
import { model1_state, model2_state, model3_state, model4_state} from '../dummydata/modelState.js';
import { model1_data, model2_data, model3_data, model4_data} from '../dummydata/modelsData.js';

dotenv.config()


/**
* -------------- GET ROUTES ----------------
* "/"
* "/models/:modelName"
*
*/

router.get("/modelNames", (req, res) => {

    return res.status(200).send(modelNames);
})


router.get("/models/:modelName", (req, res) => {

    if (req.params.modelName == 'RegModel') {
        return res.status(200).send(model1_data);

    } else if (req.params.modelName == 'SavedModel') {
        return res.status(200).send(model2_data);

    } else if (req.params.modelName == 'SavedModel4') {
        return res.status(200).send(model3_data);

    } else if (req.params.modelName == 'SavedModel5') {
        return res.status(200).send(model4_data);

    } else {
        return res.status(404).send({message: "model not found"})
    }

})


router.get("/results/simple/:modelName", (req, res) => {

    if (req.params.modelName == 'RegModel') {
        return res.status(200).send(model1_result);

    } else if (req.params.modelName == 'SavedModel') {
        return res.status(200).send(model2_result);

    } else if (req.params.modelName == 'SavedModel4') {
        return res.status(200).send(model3_result);

    } else if (req.params.modelName == 'SavedModel5') {
        return res.status(200).send(model4_result);

    } else {
        return res.status(404).send({ message: "Model not found" })
    }

});


router.get("/results/train/:modelName", (req, res) => {

    if (req.params.modelName == 'RegModel') {
        return res.status(200).send(model1_train);

    } else if (req.params.modelName == 'SavedModel') {
        return res.status(200).send(model2_train);

    } else if (req.params.modelName == 'SavedModel4') {
        return res.status(200).send(model3_train);

    } else if (req.params.modelName == 'SavedModel5') {
        return res.status(200).send(model4_train);


    } else {
        return res.status(404).send({ message: "Model not found" })
    }

});


router.get("/results/test/:modelName", (req, res) => {

    if (req.params.modelName == 'RegModel') {
        return res.status(200).send(model1_test);

    } else if (req.params.modelName == 'SavedModel') {
        return res.status(200).send(model2_test);

    } else if (req.params.modelName == 'SavedModel4') {
        return res.status(200).send(model3_test);

    } else if (req.params.modelName == 'SavedModel5') {
        return res.status(200).send(model4_test);

    } else {
        return res.status(404).send({ message: "Model not found" })
    }

});


router.get("/Model/Info/:modelName", (req, res) => {

    if (req.params.modelName == 'RegModel') {
        return res.status(200).send(model1_info);

    } else if (req.params.modelName == 'SavedModel') {
        return res.status(200).send(model2_info);

    } else if (req.params.modelName == 'SavedModel4') {
        return res.status(200).send(model3_info);

    } else if (req.params.modelName == 'SavedModel5') {
        return res.status(200).send(model4_info);

    } else {
        return res.status(404).send({ message: "Model not found" })
    }
});


router.get("/datasetNames", (req, res) => {

    return res.status(200).send(datasetNames);
})

router.get("/model/state/:modelName", (req, res) => {

    if (req.params.modelName == 'RegModel') {
        return res.status(200).send(model1_state);

    } else if (req.params.modelName == 'SavedModel') {
        return res.status(200).send(model2_state);

    } else if (req.params.modelName == 'SavedModel5'){
        return res.status(200).send(model4_state)
    }
    else {
        return res.status(200).send(model3_state)
    }

})



router.get("/Model/StopGracefull/:modelName", (req, res) => {


    if (req.params.modelName == 'RegModel') {
        model1_state['state'] = 0;
        return res.status(200).send(model1_state);

    } else if (req.params.modelName == 'SavedModel') {
        model2_state['state'] = 0;
        return res.status(200).send(model2_state);

    } else {
        return res.status(404).send({ message: "Cant stop model since it's not running" })
    }
});






/**
* -------------- POST ROUTES ----------------
* "/"
* "/Model/Init/:modelName"
*/


router.post("/Model/Init/", (req, res) => {


    if (req.body.ModelName == 'RegModel') {
        model1_state['state'] = 1;
        return res.status(200).send(model1_state);

    } else if (req.body.ModelName == 'SavedModel') {
        model2_state['state'] = 1;
        return res.status(200).send(model2_state);

    } else if (req.body.ModelName == 'SavedModel4') {
        model3_state['state'] = 1;
        return res.status(200).send(model3_state);

    } else {
        console.log("model not found:", req.body.ModelName)
        return res.status(404).send({ message: "Model not found" })
    }
});


/**
* -------------- PUT ROUTES ----------------
* "/Model/Update"
*/

router.put("/Model/UpdateInformation", (req, res) => {
    console.log(req.body)

    if (req.body.ModelName == 'RegModel') {

        model1_data[0]['batchSize'] = req.body.BatchSize
        model1_data[0]['epochs'] = req.body.Epochs
        model1_data[0]['dataset'] = req.body.Dataset

        return res.status(200).send(model1_data);

    } else if (req.body.ModelName == 'SavedModel') {

        model2_data[0]['batchSize'] = req.body.BatchSize
        model2_data[0]['epochs'] = req.body.Epochs
        model2_data[0]['dataset'] = req.body.Dataset

        return res.status(200).send(model2_data);

    } else if (req.body.ModelName == 'SavedModel4') {

        model3_data[0]['batchSize'] = req.body.BatchSize
        model3_data[0]['epochs'] = req.body.Epochs
        model3_data[0]['dataset'] = req.body.Dataset

        return res.status(200).send(model3_data);

    } else if (req.body.ModelName == 'SavedModel5') {

        model4_data[0]['batchSize'] = req.body.BatchSize
        model4_data[0]['epochs'] = req.body.Epochs
        model4_data[0]['dataset'] = req.body.Dataset

        return res.status(200).send(model4_data);

    } else {
        return res.status(404).send({ message: "Model not found" })
    }
});






