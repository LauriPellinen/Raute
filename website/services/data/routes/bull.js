import express, { response } from 'express';
import dotenv from 'dotenv'
import axios from 'axios'
export const router = express.Router();

dotenv.config()

/**
* -------------- GET ROUTES ----------------
* "/"
* "/modelNames"
* "/models/:modelName"
*/


router.get("/modelNames", (req, res) => {

    let getModelNames = axios({
        method: "get",
        url: process.env.TEAM2API + 'modelNames'
    })

    return getModelNames.then(response => {
        return res.send(response.data)

    }).catch(err => {
        console.log("error in GET /modelNames:", err.message)
        return res.status(500).send({ message: "Failed fetching" })
    });
})


router.get("/models/:modelName", (req, res) => {

    let getModelInfo = axios({
        method: "get",
        url: process.env.TEAM2API + `models/${req.params.modelName}`
    })

    return getModelInfo.then(response => {
        return res.send(response.data)

    }).catch(err => {
        console.log("error in GET /models/:modelName:", err.message)
        return res.status(500).send({ message: "Failed fetching, no model found?" })
    });
})


router.get("/results/simple/:modelName", (req, res) => {

    let getModelResultSimple = axios({
        method: "get",
        url: process.env.TEAM2API + `results/simple/${req.params.modelName}`
    })

    return getModelResultSimple.then(response => {
        return res.send(response.data)
    }).catch(err => {
        console.log("error in GET /results/simple/:modelName, ", err.message)
        return res.status(500).send({ message: "Failed fetching" })
    });

});


router.get("/results/train/:modelName", (req, res) => {

    let getModelResultTrain = axios({
        method: "get",
        url: process.env.TEAM2API + `results/train/${req.params.modelName}`
    });

    return getModelResultTrain.then(response => {
        return res.send(response.data)
    }).catch(err => {
        console.log("error in GET /results/train/:modelName, ", err.message)
        return res.status(500).send({ message: "Failed fetching" })
    });

});


router.get("/results/test/:modelName", (req, res) => {

    let getModelResultTest = axios({
        method: "get",
        url: process.env.TEAM2API + `results/test/${req.params.modelName}`
    });

    return getModelResultTest.then(response => {
        return res.send(response.data)
    }).catch(err => {
        console.log("error in GET /results/test/:modelName, ", err.message)
        return res.status(500).send({ message: "Failed fetching" })
    });
});


router.get("/Model/Info/:modelName", (req, res) => {

    let getModelResultTest = axios({
        method: "get",
        url: process.env.TEAM2API + `Model/Info/${req.params.modelName}`
    });

    return getModelResultTest.then(response => {
        return res.send(response.data)
    }).catch(err => {
        console.log("error in GET /Model/Info/:modelName, ", err.message)
        return res.status(500).send({ message: "Failed fetching" })
    });

});


router.get("/datasetNames", (req, res) => {

    let getDatasetnames = axios({
        method: "get",
        url: process.env.TEAM2API + `datasetNames`
    });

    // Send HTTP-GET request to Configuration-container
    return getDatasetnames.then(response => {
        return res.send(response.data)
    }).catch(err => {
        console.log("error in GET /datasetNames, ", err.message)
        return res.status(500).send({ message: "Failed fetching" })
    });

});


router.get("/Model/state/:modelName", (req, res) => {

    let getState = axios({
        method: "get",
        url: process.env.TEAM2API + `Model/state/${req.params.modelName}`
    });

    // Send HTTP-GET request to Configuration-container
    return getState.then(response => {
        return res.send(response.data)
    }).catch(err => {
        console.log("error in GET /Model/state/:modelName, ", err.message)
        return res.status(500).send({ message: "Failed fetching" })
    });

});



router.get("/Model/StopGracefull/:modelName", (req, res) => {

    let stopGracefull = axios({
        method: "get",
        url: process.env.TEAM2API + `Model/StopGracefull/${req.params.modelName}`
    });

    // Send HTTP-GET request to Configuration-container
    return stopGracefull.then(response => {
        return res.send(response.data)
    }).catch(err => {
        console.log("error in GET /Model/StopGracefull/:modelName, ", err.message)
        return res.status(500).send({ message: "Failed fetching" })
    });

});


router.get("/results/train_good_and_bad_image/:modelName", (req, res) => {

    let getModelResultImages = axios({
        method: "get",
        url: process.env.TEAM2API + `results/train_good_and_bad_image/${req.params.modelName}`
    })

    return getModelResultImages.then(response => {
        return res.send(response.data)
    }).catch(err => {
        console.log("error in GET /results/train_good_and_bad_image/:modelName, ", err.message)
        return res.status(500).send({ message: "Failed fetching" })
    });

});



/**
* -------------- POST ROUTES ----------------
* "/Model/init/"
*/


router.post("/Model/Init", (req, res) => {

    let postInit = axios({
        method: "post",
        data: req.body,
        url: process.env.TEAM2API + `Model/Init`
    });

    return postInit.then(response => {
        return res.send(response.data)
    }).catch(err => {
        console.log("error in POST /Model/Init, ", err.message)
        return res.status(500).send({ message: "Failed fetching" })
    });

});


/**
* -------------- PUT ROUTES ----------------
* "/Model/Update"
*/

router.put("/Model/UpdateInformation", (req, res) => {

    let postInit = axios({
        method: "put",
        data: req.body,
        url: process.env.TEAM2API + `Model/UpdateInformation`
    });

    return postInit.then(response => {
        return res.send(response.data)
    }).catch(err => {
        console.log("error in PUT /Model/UpdateInformation, ", err.message)
        return res.status(500).send({ message: "Failed fetching" })
    });

});
