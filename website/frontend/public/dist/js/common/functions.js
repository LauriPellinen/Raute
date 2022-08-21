// Add sidebar Buttons

function addSidebarButtons() {

    // Fetches modelNames, Imported from getNames.js
    getModelNames().then(modelNames => {

        // Loop through modelNames
        for (let i = 0; i < Object.keys(modelNames).length; i++) {

            // Add button and eventListener, Imported from addSidebarButton.js
            addButton(sidebar_buttons, modelNames[i]["modelName"], i);
            addButtonEventListener(`sidebar-button-${i}`, modelNames);
        }

        // Click first button when done
        document.getElementById("sidebar-button-0").click();
    })
}




// Adds Datasets to Dropdown list in Configuration page
function DatasetNamesToList(parent_element) {

    let itemDiv = document.createElement("option");

    // Get Dataset Names, imported from getNames.js
    getDatasetNames().then(datasetNames => {

        // Put all Dataset Names to dropdown lost
        for (let i = 0; i < Object.keys(datasetNames).length; i++) {


            // Create <option> element
            itemDiv = document.createElement("option");

            // add text to <option> element
            itemDiv.innerHTML = datasetNames[i]["datasetName"];

            // Add itemDiv under parent_element
            parent_element.appendChild(itemDiv);
        }
    })
}



// Loading spinner On/Off used when fetching data //

function SpinnerOn(title) {

    spinner.style.display = "inline-block"
    load_text.style.display = "block"
    load_text.innerHTML = title
}

function SpinnerOff() {
    spinner.style.display = "none"
    load_text.style.display = "none"
}