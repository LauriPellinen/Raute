
const server_status = document.getElementById("server-status")


function getServerStatus() {

    //adds dataset names to dropdown list
    axios.get("/team2api/datasetNames").then(response => {
        console.log("team2api status:", response.status);
        server_status.setAttribute("fill", "green")
        
    }).catch(err => {
        console.log("error getting datasetNames:", err)
    })

}
getServerStatus()