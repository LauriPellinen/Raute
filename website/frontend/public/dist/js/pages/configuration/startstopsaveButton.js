// Event listeners for Start/Stop/Save buttons

function startTrainingButton() {
    console.log("### START startTrainingButton() ###")

    SpinnerOn("Starting Model..")

    const promises = [];
     
    promises.push(

        // Post Init to API
        axios({
            method: "post",
            url: `/team2api/init/${model_title.innerHTML}`,
            data: {
                batchSize: model_batch.value,
                Epochs: model_epochs.value,
                ModelName: model_title.innerHTML,
                Dataset: datasetObject.value
            }
        }).then(() => {

            start_button.disabled = true
            stop_button.disabled = false
            errorlabel.style = "display: none;"
            success_laabel.innerHTML = "Started Training"
            success_laabel.style = "display: block;"
            getStatus()

        }).catch(err => {
            success_laabel.style = "display: none;"
            errorlabel.style = "display: block;"
            errorlabel.innerHTML = err

            console.log("error:", err)

        }).finally(()=>{
            SpinnerOff()



        })
    )
    
    // When all axios request are finished, run this.
    Promise.all(promises).then(() => {

        axios({
            method: "post",
            data: {
                activity: `Started training for model ${model_title.innerHTML}`
            },
            url: "/database_functions/console/add_activity"
        }).then(() => {
            console.log("Log successful")
            console.log("### END startTrainingButton() ###")
        })
            .catch((err) => console.log(err))
        
    })

}


function stopTrainingButton() {
    console.log("### START stopTrainingButton() ###")

    SpinnerOn("Stopping Model")

    const promises = [];
    promises.push(
        axios({
            method: "get",
            url: `/team2api/Model/StopGracefull/${model_title.innerHTML}`,
        }).then(() => {
            start_button.disabled = false
            stop_button.disabled = true
            start_button.value = "Start Training"
            errorlabel.style = "display: none;"
            success_laabel.innerHTML = "Stopped Training"
            success_laabel.style = "display: block;"
            getStatus()

        }).catch(err => {
            success_laabel.style = "display: none;"
            errorlabel.style = "display: block;"
            errorlabel.innerHTML = err
            console.log("Error:", err)


        }).finally(()=>{
            SpinnerOff()



        })
    )



    // Logataan toiminta tietokantaan
    promises.push(
        axios({
            method: "post",
            data: {
                activity: `Started training for model ${model_title.innerHTML}`
            },
            url: "/database_functions/console/add_activity"
        }).then(() => {
            console.log("Log successful")
        }).catch((err) => console.log(err))
    )


    // When all axios request are finished, run this.
    Promise.all(promises).then(() => {
        console.log("### END stopTrainingButton() ###")
    })

}



function savesettingsButton() {
    console.log("### START savesettingsButton() ###")

    SpinnerOn("Saving Model")

    const promises = [];

    // Etsitään pisin value.
    var longest = list_of_model_values.reduce(function (longest, currentWord) {
        return currentWord.length > longest.length ? currentWord : longest
    }, '');
    var longest_lenght = longest.length
    console.log(" number ", longest, longest.length)


    // Logataan toiminta tietokantaan
    // Lisätään paddingiä valueen, jotta kaikkien arvojen nuoli lähtee samasta kohtaan.
    //
    // Esim. 
    // original_model_epochs = 10
    // longest = ./train   lenght = 7
    // "10".toString().padEnd(7, " ")

    // POST request for remote image in node.js
    promises.push(
        axios({
            method: "put",
            url: `/team2api/Model/Update`,
            data: {
                ModelName: model_title.innerHTML,
                Epochs: model_epochs.value,
                batchSize: model_batch.value,
                Dataset: datasetObject.value
            },
        }).then(() => {
            errorlabel.style = "display: none;"
            success_laabel.innerHTML = "Save succesful"
            success_laabel.style = "display: block;"

        }).catch(err => {

            success_laabel.style = "display: none;"
            errorlabel.style = "display: block;"
            errorlabel.innerHTML = err

            console.log("error:", err)
        }).finally(()=>{
            SpinnerOff()
        })
    )

    promises.push(
        axios({
            method: "post",
            data: {
                activity: `Changed settings for model:
                                               
                                                ${original_model_epochs.toString().padEnd(longest_lenght, " ")} ---> ${model_epochs.value}
                                                ${original_model_batch.toString().padEnd(longest_lenght, " ")} ---> ${model_batch.value}
                                                Using dataset "${datasetObject.value}"`
            },
            url: "/database_functions/console/add_activity"
        }).then(() => console.log("Log successful"))
            .catch((err) => console.log(err))
    )

    // When all axios request are finished, run this.
    Promise.all(promises).then(() => {
        console.log("### END savesettingsButton() ###")
    })
}

