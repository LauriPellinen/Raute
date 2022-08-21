// Get status for models from API

async function getStatus() {

    /* Returns dictionary that contains modelname and status
       {
        RegModel: 1,
        RegModel2: 0 
       }
    */
    var status_dict = {}
    var status_button = 0

    return new Promise(resolve => {

        // Takes all modelnames from sidebar buttons
        for (let i = 0; i < sidebar_buttons.children.length; i++) {

            // Get model state from API
            axios.get(`/team2api/model/state/${sidebar_buttons.children[i].getAttribute("modelname")}`).then(response => {

                // Sidebar button's icon element
                status_button = document.getElementById(`buttonstatus-${i}`)


                // Change button colors based on model's state & add status to dict
                if (response.data['state'] == 0) {

                    status_button.style.color = "yellow"
                    status_dict[sidebar_buttons.children[i].getAttribute("modelname")] = 0

                } else if (response.data['state'] == 1) {

                    status_button.style.color = "green"
                    status_dict[sidebar_buttons.children[i].getAttribute("modelname")] = 1

                } else if (response.data['state'] == 2) {

                    status_button.style.color = "red"
                    status_dict[sidebar_buttons.children[i].getAttribute("modelname")] = 2

                    console.log("Model status:2, error has occured", sidebar_buttons.children[i].getAttribute("modelname"))

                }

                // Wait until every request has been fulfilled then return status_dict
                resolve(status_dict);

            })
        }
    })

}