// Used to add button element under parent element
function addButton(parent_element, model_name, i) {

    // create a new div element <li>
    const itemDiv = document.createElement("li");

    // create class to li <li class="sidebard-item" > </li>
    itemDiv.classList.add("sidebar-item");
    itemDiv.setAttribute("id", `sidebar-button-${i}`);
    itemDiv.setAttribute("modelname", model_name);

    // add div under some other div <customdiv><li class="sidebar-item"> </li> </customdiv>
    parent_element.appendChild(itemDiv);

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


// Adds EventListener to sidebar Button
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
                getStatus()
                
                // Hide error&success messages
                success_laabel.style = "display:none;"
                errorlabel.style = "display:none;"

                // Get model's state (0=stopped, 1=running, 2=error)
                promises.push(
                    axios.get(`/team2api/model/state/${temp_button.getAttribute("modelname")}`).then(function (response) {
                        console.log(`${temp_button.getAttribute("modelname")} status:`, response.data['state']);


                        switch (response.data['state']) {
                            case 0:
                                stop_button.disabled = true;
                                start_button.disabled = false;
                                start_button.innerHTML = "Start training"
                                break;

                            case 1:
                                stop_button.disabled = false;
                                start_button.disabled = true;
                                start_button.innerHTML = "Running.."
                                break;

                            case 2:
                                stop_button.disabled = false;
                                start_button.disabled = false;
                                start_button.innerHTML = "Start training"

                                success_laabel.style = "display: none;"
                                errorlabel.style = "display: block;"
                                errorlabel.innerHTML = "Error in NN, model is not running"
                        }

                    }).catch(err => {
                        success_laabel.style = "display: none;"
                        errorlabel.style = "display: block;"
                        errorlabel.innerHTML = err
                        console.log(err)
                    })
                )


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

                        datasetObject.value = response.data["dataset"]
                        model_epochs.value = response.data["epochs"];
                        model_batch.value = response.data["batchSize"];
                        model_title.innerHTML = response.data["modelName"];

                    }).catch(err => {
                        success_laabel.style = "display: none;"
                        errorlabel.style = "display: block;"
                        errorlabel.innerHTML = err
                        console.log(err)

                        /* Sori Erik hajotin kaikki :)
                        // Otetaan originaalit talteen
                        original_model_title = api_response["modelName"];
                        original_model_name = api_response["modelName"];
                        original_model_epochs = api_response["epochs"];
                        original_model_batch = api_response["batch_size"];
                        original_model_traindir = api_response["train_dir"];
                        original_model_testdir = api_response["test_dir"];
    
                        list_of_model_values.push(
                            original_model_name,
                            original_model_epochs,
                            original_model_batch)
    
                            */

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

