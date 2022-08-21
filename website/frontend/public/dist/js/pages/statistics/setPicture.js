function setPicture_Statistics(select) {

    console.log("This is select: ", select.innerHTML)


    //${temp_button.getAttribute("modelname")}
    //var img = document.getElementById("dropdown-menu");

    var imageBox = document.getElementById("stat-image");

    axios.get(`/team2api/results/train/${select.innerHTML.split(" ")[0]}`).then(function (response) {
        console.log(response.data[0]["testLoss"]);
        api_response = response.data[0];

        Plotly.newPlot("stat-image",[{
            y:api_response["epochs"],
            type:"line"
        }])
    });

    //console.log("This is loaded: ",dropdown_item.innrHTML.toLowerCase().split(" ")[0],eval(`${select.innerHTML.toLowerCase().split(" ")[0]}_train`))
    imageBox.src = eval(`${select.innerHTML.toLowerCase().replace(" ", "_")}`)
    //select.className = "dropdown-item active";
    document.getElementById("dropdown-current").innerHTML = select.innerHTML

    var dropdown_item = document.getElementsByClassName("dropdown-item");

    $('button.dropdown-item.active').removeClass("active");
    $(select).addClass("active");

}