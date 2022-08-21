// Get Models from /team2api/modelNames route

function getModelNames() {


    axios.get("/team2api/modelNames").then(function (response) {

        // Loop through modelNames and make buttons
        for (let i = 0; i < Object.keys(response.data).length; i++) {

            // Imported from addSidebarButton.js
            addButton(sidebar_buttons, response.data[i]["modelName"], i);
            addButtonEventListener(`sidebar-button-${i}`, response.data);
        }

        // Clicks the first button when done creating buttons
        document.getElementById("sidebar-button-0").click();
    }).catch(err => {
        console.log("error getting modelNames:", err)
    })
}

// Get Datasets from /team2api/datasetNames route

async function getDatasetNames() {

    return axios.get("/team2api/datasetNames").then(response => {

        return response.data

    }).catch(err => {
        console.log("error getting datasetNames:", err)
        return err
    })
}