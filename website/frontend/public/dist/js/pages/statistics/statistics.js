let api_response = [{}];


// Input fields, value
const model_epochs = document.getElementById("epochs-input")
const model_batch = document.getElementById("batch-input")
const model_traindir = document.getElementById("traindir-input")
const model_testdir = document.getElementById("testdir-input")
const model_name = document.getElementById("name-input")

// Buttons
const save_button = document.getElementById("btn-submit-NN")


//Labels, progress-bar
const model_title = document.getElementById("model-title");

const model_running_epochs = document.getElementById("running-epochs")
const progress_bar = document.getElementById("progress-bar")
const errorlabel = document.getElementById("sheetserror")


// Class where all sidebar buttons are located
const sidebar_buttons = document.getElementById("sidebarnav");

// Get Models from team2api
axios.get("/team2api/modelNames").then(function (response) {
    console.log(response.data);
    api_response = response.data;
    for (let i = 0; i < Object.keys(api_response).length; i++) {
        addButton(sidebar_buttons, api_response[i]["modelName"], i);
        addButtonEventListener(`sidebar-button-${i}`, api_response);
    }
    document.getElementById("sidebar-button-0").click();
});


// axios.get(`/team2api/Model/info/${temp_button.getAttribute("modelname")}`).then(function (response) {
//     console.log(response.data);
//     api_response = response.data;
//     for (let i = 0; i < Object.keys(api_response).length; i++) {
//         addButton(sidebar_buttons, api_response[i]["modelName"], i);
//         addButtonEventListener(`sidebar-button-${i}`, api_response);
//     }
//     document.getElementById("sidebar-button-0").click();
// });
// axios.get(`/team2api/model/info/SavedModel4`).then(function (response) {
//     //console.log(response.data);
//     api_response = response.data[0];
//     console.log("GoodImage ",api_response["GoodImage"])
//     console.log("BadImage ",api_response["BadImage"])
//     //model_accuracy.innerHTML = api_response["GoodImage"]
//     //model_accuracy.innerHTML = api_response["GoodImage"]
// });



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

    // create unique id to span <span id="sidebar-button-1">
    //spanDiv.setAttribute("id", `sidebar-button-${i}`);
    spanDiv.innerHTML = model_name
    aDiv.appendChild(spanDiv);  // append under aDiv
}

let statusInterval = 0;



function addButtonEventListener(element_id, api_response) {
    //button what is configured
    let temp_button = document.getElementById(element_id);

    //Loop through api_response
    for (let i = 0; i < Object.keys(api_response).length; i++) {
        //compare and find right element from api_response
        if (parseInt(element_id.slice(-1)) == i) {
            temp_button.addEventListener("click", function (e) {
                getStatus()
                model_title.innerHTML = api_response[i]["modelName"]
                var dropdown_item_train = document.getElementById("train_image");
                var dropdown_item_test = document.getElementById("test_image");

                var dropdown_current = document.getElementById("dropdown-current");

                dropdown_item_train.innerHTML = temp_button.getAttribute("modelname") + " Train"
                dropdown_item_test.innerHTML = temp_button.getAttribute("modelname") + " Test"

                dropdown_current.innerHTML = dropdown_item_train.innerHTML

                var imageBox = document.getElementById("stat-image");

                // GRAFANA PLOTTAUS //
                imageBox.src = eval(`${dropdown_current.innerHTML.toLowerCase().split(" ")[0]}_train`)//.toLowerCase()
                setPicture_Grafana(dropdown_current)

                // WANHA PLOTTAUS //
                // setPicturessa mennään plot_statistics, joka plottaa kaikki pisteet mitä haulta saa.
                //setPicture_Statistics(dropdown_current)
                //dropdown_menu.innerHTML = `<li><button class="dropdown-item" value="" href=""
                //                                onclick="setPicture(this);">${temp_button.getAttribute("modelname")} Train</button></li>
                //                            <li><button class="dropdown-item" value="" href=""
                //                                onclick="setPicture(this);">${temp_button.getAttribute("modelname")} Test</button></li>`

                clearInterval(statusInterval);
                statusInterval = setInterval(function(){

                    axios.get(`/team2api/Model/Info/${temp_button.getAttribute("modelname")}`).then(function (response) {
                        console.log(response.data);
                        api_response = response.data[0];
                        
                        model_running_epochs.innerHTML = api_response["CurrentEpoch"]+"/"+api_response["TotalEpochs"] 
                        progress_bar.style = `width: ${api_response["CurrentEpoch"]/api_response["TotalEpochs"]*100}%`

                        // Tämä lisää yhden hakupisteen (tai enempi) plotille.
                        extend_plot(response.data, "CurrentEpoch", "TrainingLoss","TestLoss")
                    });


                 }, 5000);
                 
                //reset all buttons background color
                for (let i = 0; i < sidebar_buttons.children.length; i++) {
                    sidebar_buttons.children[i].style = "background-color: #007CB0;"
                };


                temp_button.style = "background-color: #004B6B;"
                //console.log(temp_button.innerHTML)

                // Get Model information from team2api
                axios.get(`/team2api/models/${temp_button.getAttribute("modelname")}`).then(function (response) {
                    console.log(response.data);
                    api_response = response.data[0];

                    
                    model_name.innerHTML = api_response["modelName"];
                    model_batch.innerHTML = api_response["batch_size"];
                }).catch(err => {
                    
                    //error_laabel.innerHTML = "Save failed"
                    console.log(err.message)
                    errorlabel.style = "display: block;"
                    errorlabel.innerHTML = err
            
                })



            });
        }
    }
}



const regmodel_train ="http://localhost:3000/d/yGnjPq2nz/performance?orgId=1&from=1639446581747&to=1639468181747&theme=light&viewPanel=2"
const regmodel_test ="http://localhost:3000/d/yGnjPq2nz/performance?orgId=1&from=1639448315543&to=1639469915543&theme=light&viewPanel=3"

const regmodel2_train ="http://localhost:3000/d/yGnjPq2nz/performance?orgId=1&from=1639448325387&to=1639469925387&theme=light&viewPanel=4"
const regmodel2_test ="http://localhost:3000/d/yGnjPq2nz/performance?orgId=1&from=1639448334789&to=1639469934789&theme=light&viewPanel=7"

const regmodel3_train ="http://localhost:3000/d/yGnjPq2nz/performance?orgId=1&from=1639448350992&to=1639469950992&theme=light&viewPanel=8"
const regmodel3_test ="http://localhost:3000/d/yGnjPq2nz/performance?orgId=1&from=1639448362379&to=1639469962379&theme=light&viewPanel=9"

const savedmodel_train ="http://localhost:3000/d/yGnjPq2nz/performance?orgId=1&from=1639448373648&to=1639469973649&theme=light&viewPanel=5"
const savedmodel_test ="http://localhost:3000/d/yGnjPq2nz/performance?orgId=1&from=1639448385258&to=1639469985258&theme=light&viewPanel=6"

const savedmodel4_train ="http://localhost:3000/d/yGnjPq2nz/performance?orgId=1&from=1639448399907&to=1639469999907&theme=light&viewPanel=10"
const savedmodel4_test ="http://localhost:3000/d/yGnjPq2nz/performance?orgId=1&from=1639448409130&to=1639470009131&theme=light&viewPanel=11"

const savedmodel5_train ="http://localhost:3000/d/yGnjPq2nz/performance?orgId=1&from=1639448421791&to=1639470021791&theme=light&viewPanel=12"
const savedmodel5_test ="http://localhost:3000/d/yGnjPq2nz/performance?orgId=1&from=1639448431761&to=1639470031761&theme=light&viewPanel=13"

function setPicture_Grafana(select) {

    console.log("This is select: ", select.innerHTML)


    //${temp_button.getAttribute("modelname")}
    //var img = document.getElementById("dropdown-menu");

    var imageBox = document.getElementById("stat-image")


    //console.log("This is loaded: ",dropdown_item.innrHTML.toLowerCase().split(" ")[0],eval(`${select.innerHTML.toLowerCase().split(" ")[0]}_train`))
    imageBox.src = eval(`${select.innerHTML.toLowerCase().replace(" ", "_")}`)
    //select.className = "dropdown-item active";
    document.getElementById("dropdown-current").innerHTML = select.innerHTML

    var dropdown_item = document.getElementsByClassName("dropdown-item");

    $('button.dropdown-item.active').removeClass("active");
    $(select).addClass("active");

}











// Otetaan axios dictionary-lististä kaikki tietyllä keyllä olevat arvot listaan
function response_key_tolist(api_response, key){
    var values=[]
    api_response.forEach(function(item) {
        values.push(item[key])
    });
    return values
}

var cnt=0;
function setPicture_Statistics(select) {

    // klikattu elementti on esim. Model1 Train
    // Erotetaan "Model1", "Train"
    let = train_or_test = select.innerHTML.split(" ")

    if (train_or_test[1] == "Train"){
        // esim. Model1 syötetään
        plot_statistics(train_or_test[0], "train", "epochs", "trainAcc", "trainLoss")
    }else if (train_or_test[1] == "Test"){
        plot_statistics(train_or_test[0], "test", "epochs", "testAcc", "testLoss")
    }
    
    //console.log("This is loaded: ",dropdown_item.innrHTML.toLowerCase().split(" ")[0],eval(`${select.innerHTML.toLowerCase().split(" ")[0]}_train`))
    //imageBox.src = plot_picture//eval(`${select.innerHTML.toLowerCase().replace(" ", "_")}`)
    //select.className = "dropdown-item active";

    // Highlightataan dropdown valikossa valinta
    document.getElementById("dropdown-current").innerHTML = select.innerHTML

    var dropdown_item = document.getElementsByClassName("dropdown-item");

    $('button.dropdown-item.active').removeClass("active");
    $(select).addClass("active");
}




// ticks meinaa x-axelilla olevia arvoja (esim. epokit)
var ticks = []
// tarvitaan nykyisen tick-listan pituus.
var tick_length = []


//------------------ //
// *PLOTTAUS FUNKTIO* //
//------------------ //
function plot_statistics(model, train_or_test, epoch_column, accuracy_column, loss_column){
    
    // Tehdään axios-pyyntö URLiin esim. team2api/results/train/model1
    axios.get(`/team2api/results/${train_or_test}/${model}`).then(function (response) {

        api_response = response.data;
        console.log(`This is ${model} data: ${api_response}`);

        // Epokit listaan erikseen mitkä halutaan X-axelille
        var epochs= response_key_tolist(api_response, epoch_column)
        // Tehdään lista epokkien pituuden mukaan, jotta plottaus tapahtuu aina perätoisensa jälkeen.
        // esim.
        // epochs = [0, 4, 6, 19, 0, 1]
        // tick_format = [1, 2, 3, 4, 5, 6]
        var tick_format = Array.from(Array(epochs.length).keys());

        // Tallennetaan globaaleihin
        ticks = epochs
        tick_length = ticks.length
        
        // Muut parametrit listoihin mitä halutaan Y-axelille
        var Acc = response_key_tolist(accuracy_column)
        var Loss = response_key_tolist(loss_column)

        // 1. graafi
        var trace1 = {
            x:tick_format,
            y:Loss,
            type:"line",
            xaxis:'x',
            name: 'Loss'
        }
        // 2. graafi
        var trace2 = {
            x:tick_format,
            y:Acc,
            type:"line",
            yaxis: 'y2',
            xaxis:'x',
            name: 'Accuracy'
        }

        var data = [trace1, trace2];

        // Layout plotille
        var layout = {
            title:'Performance',
            xaxis: {
                title: 'Epoch',
                tickmode: "array",
                tickvals: tick_format,
                ticktext: epochs

            },
            yaxis: {title: 'Loss'},
            yaxis2: {
                title: 'Accuracy',
                overlaying: 'y',
                side: 'right'},
            showlegend: true,
            legend: {
                orientation:"h",
                yanchor:"bottom",
                xanchor:"left",
                y: -0.2,
                x:0.01,
                //traceorder: 'reversed',
                font: {size: 16},
                //yref: 'paper'
            }
    
        };

        // Itse plottaus
        Plotly.newPlot("stat-image", data, layout, {responsive: true})
    })
}


//------------------------------- //
// *PLOTTAUKSEN JATKAMIS FUNKTIO* //
//------------------------------- //
function extend_plot(response, epoch_column, train_loss_column, test_loss_column) {
    api_response = response;

    // Uudet epokit
    var epochs= response_key_tolist(epoch_column)

    // Otetaan vanhojen epokkien pituus
    latest_tick = tick_length

    // Luo lista joka alkaa tikkien viimeisestä
    // esim vanha lista [1, 2, 3] = 3+1 = 4
    var new_ticks_format = Array(epochs.length).join().split(',').map(function(a){return this.i++},{i:latest_tick+2});
    // Lista, jonka pituus on vanhat epokit+uudet esim. [1,2,3,4,5,6]
    var tick_format = Array.from(Array(tick_length+new_ticks_format.length).keys());

    // updatetaan globaalit, jotta uudet arvot on mukana
    tick_length = tick_length+new_ticks_format.length
    ticks = ticks.concat(epochs)

    var TrainLoss = response_key_tolist(train_loss_column)
    var TestLoss = response_key_tolist(test_loss_column)


    console.log("New epoch: ",TrainLoss,"at index :",new_ticks_format,)

    // Itse pisteen plottaus, plottaa siis normaali-plottauksen viimeisen pisteen jälkeen.
    Plotly.extendTraces("stat-image",
        {
        x:[new_ticks_format,new_ticks_format],
        y:[TrainLoss,TestLoss]
        },
        [0,1],50 // Kuinka monta pistettä näytetään kerralla.
    )
    // Muutetaan koko plotin tikit, jotta ne näyttävät oikeilta
    Plotly.relayout("stat-image",{
        xaxis: {
        tickvals: tick_format,
        ticktext: ticks
        }
    })
    cnt = cnt+1;

    // Jos pisteitä on yli 50, alkaa plotti liikkumaan oikealle, piilottaen vanhat arvot.
    if(cnt > 50) {
        Plotly.relayout("stat-image",{
            xaxis:{
                range: [cnt-50,cnt]
            }
        })
    }
}


function getStatus(){


    let status_button = 0;
    const status_list = []
    const promises = []
    for (let i = 0; i < sidebar_buttons.children.length; i++) {
        
        console.log(sidebar_buttons.children[i].getAttribute("modelname"))
        promises.push(
        axios.get(`/team2api/model/state/${sidebar_buttons.children[i].getAttribute("modelname")}`).then(response => {
            status_button = document.getElementById(`buttonstatus-${i}`)

            switch (response.data['state']) {
                case 0:
                    
                    console.log("Model status:0, no auto updates")
                    status_button.style = "color: yellow;"
                    status_list.push(0)
                    break;
                    
                case 1:
                    status_button.style = "color: green;"
                    status_list.push(1)
                    break;
                    
                case 2:
                    status_button.style = "color: red;"
                    status_list.push(2)

            }
        })
        )
        Promise.all(promises).then(result=>{
            return status_list
        })
    };

}


// if (train_or_test[1] == "Train"){
    //     axios.get(`/team2api/results/train/${train_or_test[0]}`).then(function (response) {
    //         console.log("This is train data: ",response.data);

    //         var test = "epochs"
            
    //         api_response = response.data;

    //         const epochs=[]
    //         api_response.forEach(function(item) {
    //             epochs.push(item[test])
    //         });
    //         //const epochs = api_response.map(({ "epochs" }) => "epochs")//.map(String)
    //         const tick_format = Array.from(Array(epochs.length).keys());
    //         const trainLoss = api_response.map(({ trainLoss }) => trainLoss)
    //         const trainAcc = api_response.map(({ trainAcc }) => trainAcc)
    //         //et i=0; i < response.data.lenght(); i++


    //         // badImage: "/images/img2"
    //         // checkpointPath: "/models/model1"
    //         // epochs: 37
    //         // goodImage: "/images/img6"
    //         // modelName: "model1"
    //         // testAcc: 1
    //         // testLoss: 0.964014
    //         // timestamp: "Wed, 04 Nov 2020 17:44:56 GMT"

    //         var trace1 = {
    //             x:tick_format,
    //             y:trainLoss,
    //             type:"line",
    //             xaxis:'x',
    //             name: 'Loss'
    //         }
    //         var trace2 = {
    //             x:tick_format,
    //             y:trainAcc,
    //             type:"line",
    //             yaxis: 'y2',
    //             xaxis:'x',
    //             name: 'Accuracy'
    //         }

    //         var data = [trace1, trace2];

    //         var layout = {
    //             title:'Performance',
    //             xaxis: {
    //                 title: 'Epoch',
    //                 tickmode: "array",
    //                 tickvals: tick_format,
    //                 ticktext: epochs

    //             },
    //             yaxis: {title: 'Loss'},
    //             yaxis2: {
    //                 title: 'Accuracy',
    //                 overlaying: 'y',
    //                 side: 'right'},
    //             showlegend: true,
    //             legend: {
    //                 orientation:"h",
    //                 yanchor:"bottom",
    //                 xanchor:"left",
    //                 y: -0.2,
    //                 x:0.01,
    //                 //traceorder: 'reversed',
    //                 font: {size: 16},
    //                 //yref: 'paper'
    //             }
        
    //         };

    //         Plotly.newPlot("stat-image", data, layout, {responsive: true})

    //         //Plotly.update("stat-image", data, {xaxis:{autotypenumbers: "strict"}},0)

    //         var cnt = 0;
    //         //setInterval(function() {
    //         //x: [[cnt], [cnt]],
    //         //}, 50)
    //     })
    // }else if (train_or_test[1] == "Test"){
    //     axios.get(`/team2api/results/test/${train_or_test[0]}`).then(function (response) {


    //         console.log("This is test data: ",response.data);

    //         api_response = response.data;

    //         // Otetaan epokit talteen listaksi
    //         const epochs = api_response.map(({ epochs }) => epochs).map(String)
    //         // Luodaan lista, joka on epokki-listan pituinen
    //         const tick_format = Array.from(Array(epochs.length).keys());
    //         // Otetaan talteen loss and accuracy
    //         const testLoss = api_response.map(({ testLoss }) => testLoss)
    //         const testAcc = api_response.map(({ testAcc }) => testAcc)
            
    //         // var seen=[]
    //         // epochs=[]
    //         // for (let num = 0; num < unfiltered_epochs.length; num++){
    //         //     //for(num in epochs){
    //         //     seen.push(unfiltered_epochs[num])
    //         //     if (seen.includes(unfiltered_epochs[num])){
    //         //         epochs.push()
    //         //     }
    //         // }

    //         var trace1 = {
    //             x:tick_format,
    //             y:testLoss,
    //             type:"line",
    //             xaxis:'x',
    //             name: 'Loss'
    //         }
    //         var trace2 = {
    //             x:tick_format,
    //             y:testAcc,
    //             type:"line",
    //             yaxis: 'y2',
    //             xaxis:'x',
    //             name: 'Accuracy'
    //         }

    //         var data = [trace1, trace2];

    //         var layout = {
    //             title:'Performance',
    //             xaxis: {
    //                 title: 'Epoch',
    //                 showticklabels: true,
    //                 tickmode: "array",
    //                 tickvals: tick_format,
    //                 ticktext: epochs
    //             },
    //             yaxis: {title: 'Loss'},
    //             yaxis2: {
    //                 title: 'Accuracy',
    //                 overlaying: 'y',
    //                 side: 'right'},
    //                 showlegend: true,
    //             legend: {
    //                 orientation:"h",
    //                 yanchor:"bottom",
    //                 xanchor:"left",
    //                 y: -0.2,
    //                 x:0.01,
    //                 //traceorder: 'reversed',
    //                 font: {size: 16},
    //                 //yref: 'paper'
    //             }
        
    //         };

    //         Plotly.newPlot("stat-image", data, layout, {responsive: true})

    //         var cnt = 0;

    //         //x: [[cnt], [cnt]],
    //         //setInterval(function() {
    //         // Object.keys(response.data).forEach(k => {
    //         //     console.log("x",epochs[cnt],"y",getData(k, "testLoss"))
    //         //     Plotly.extendTraces("stat-image",{
    //         //         y:[[getData(k, "testLoss")],[getData(k, "testAcc")]]},
    //         //         [0,1],
    //         //         2)
    //         //     cnt++;

    //         //     if(cnt > 100) {
    //         //         Plotly.relayout("stat-image",{
    //         //             xaxis:{
    //         //                 range: [cnt-100,cnt]
    //         //             }
    //         //         })
    //         //     }
    //         // })
    //         //}, 15)
    //     })
    // }

