// function that adds buttons to sidenav
function addButton(custom_document, model_name, i) {

    // create a new div element <li>
    const itemDiv = document.createElement("li");

    // create class to li <li class="sidebard-item" > </li>
    itemDiv.classList.add("sidebar-item");
    itemDiv.setAttribute("id", `sidebar-button-${i}`);
    itemDiv.setAttribute("modelname", model_name);

    // add div under some other div <customdiv><li class="sidebar-item"> </li> </customdiv>
    custom_document.appendChild(itemDiv);

    // Create <a class="sidebar-link ..." > </a>
    const aDiv = document.createElement("a");
    aDiv.classList.add("sidebar-link", "waves-effect", "waves-dark", "sidebar-link");
    itemDiv.appendChild(aDiv); // append under itemDiv

    // create a new div element <i> </i>
    const iDiv = document.createElement("i");

    // create a class <i class="mdi mdi-view-dashboard"> </i>
    iDiv.classList.add("mdi", "mdi-view-dashboard");
    iDiv.setAttribute("id", `buttonstatus-${i}`);
    aDiv.appendChild(iDiv); // append under aDiv

    // create <span> </span>
    const spanDiv = document.createElement("span")

    // create a class <span class="hide-menu"> </span>
    spanDiv.classList.add("hide-menu");

    //spanDiv.setAttribute("id", `sidebar-button-${i}`);
    spanDiv.innerHTML = model_name
    aDiv.appendChild(spanDiv);  // append under aDiv
}



function addButtonEventListener(element_id, api_response) {
    console.log("### START addButtonEventListener() ###")

    promises = [];


    // button that is currently being configured
    let temp_button = document.getElementById(element_id);



    //Loop through api_response
    for (let i = 0; i < Object.keys(api_response).length; i++) {

        //compare and find right element from api_response
        if (parseInt(element_id.slice(-1)) == i) {


            temp_button.addEventListener("click", function (e) {

                console.log("Clicked:", element_id)

                // Hide error
                errorlabel.style = "display:none;"

                try {
                    clearInterval(statusInterval);
                }
                catch (err) {
                    // Nice error handler
                }



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



                    console.log(status_dict)


                    if (status_dict[temp_button.getAttribute("modelname")] == 0) {

                        console.log(temp_button.getAttribute("modelname"), " status: 0, no autoupdates")

                    } else if (status_dict[temp_button.getAttribute("modelname")] == 1) {


                        statusInterval = setInterval(function () {

                            axios.get(`/team2api/Model/Info/${sidebar_buttons.children[i].getAttribute("modelname")}`).then(function (response) {

                                api_response = response.data;
                                model_accuracy.innerHTML = api_response["accuracy"]

                                // Update progress bar and running stats
                                model_running_epochs.innerHTML = api_response["CurrentEpoch"] + "/" + api_response["TotalEpochs"]
                                model_running_batch.innerHTML = api_response["CurrentBatch"] + "/" + api_response["TotalBatch"]
                                progress_bar.style = `width: ${api_response["CurrentBatch"] / api_response["TotalBatch"] * 100}%`
                            }).catch(err => {
                                errorlabel.style = "display: block;"
                                errorlabel.innerHTML = err
                                console.log("error fetching /team2api/Model/Info", err)
                            })

                        }, 5000);

                    } else if (status_dict[temp_button.getAttribute("modelname")] == 2) {

                        console.log("Model status:2")

                    } else {

                        console.log("Error: Cannot get model state,", temp_button.getAttribute("modelname"))

                    }


                })







                // reset all buttons background color
                for (let i = 0; i < sidebar_buttons.children.length; i++) {
                    sidebar_buttons.children[i].style = "background-color: #007CB0;"
                };

                // selected button background color
                temp_button.style = "background-color: #004B6B;"


                // Get Model information from team2api
                promises.push(
                    axios.get(`/team2api/models/${temp_button.getAttribute("modelname")}`).then(function (response) {
                        console.log("Getting model data for:", temp_button.getAttribute("modelname"));

                        model_structure.innerHTML = response.data["structure"]
                        model_epochs.innerHTML = response.data["epochs"];
                        model_batch.innerHTML = response.data["batchSize"];
                        model_title.innerHTML = response.data["modelName"];

                    }).catch(err => {
                        errorlabel.style = "display: block;"
                        errorlabel.innerHTML = err
                        console.log(err)

                    })
                )

                // When all axios request are finished, run this.
                Promise.all(promises).then(() => {
                    console.log("### END addButtonEventListener() ###")
                })
            });
        }
    }
}



