// Get Models from /team2api/modelNames route

async function getModelNames() {

    SpinnerOn("Loading Model Names..")

    return axios.get("/team2api/modelNames")
        .then(response => {

            SpinnerOff()
            return response.data

        })
        .catch(err => {

            SpinnerOff()
            console.log("error getting modelNames:", err)
            return err
        })
}


// Fetch datasetNames from API
async function getDatasetNames() {

    SpinnerOn("Loading Dataset Names..")
    return axios.get("/team2api/datasetNames").then(response => {
        SpinnerOff()
        return response.data

    }).catch(err => {
        SpinnerOff()
        console.log("error getting datasetNames:", err)
        return err
    })
}




function getStatus() {

    SpinnerOn("Fetching Model Status...")
    let status_button = 0;
    const status_dict = {}
    const promises = []
    for (let i = 0; i < sidebar_buttons.children.length; i++) {

        promises.push(
            axios.get(`/team2api/model/state/${sidebar_buttons.children[i].getAttribute("modelname")}`).then(response => {
                status_button = document.getElementById(`buttonstatus-${i}`)

                switch (response.data['state']) {
                    case 0:

                        console.log("Model status:0, no auto updates")
                        status_button.style = "color: yellow;"
                        status_dict[sidebar_buttons.children[i].getAttribute("modelname")] = 0
                        break;

                    case 1:
                        status_button.style = "color: green;"
                        status_dict[sidebar_buttons.children[i].getAttribute("modelname")] = 1
                        break;

                    case 2:
                        status_button.style = "color: red;"
                        status_dict[sidebar_buttons.children[i].getAttribute("modelname")] = 2

                }
            })
        )
    };

    Promise.all(promises).then(() => {
        SpinnerOff()
        return status_dict
    })
}