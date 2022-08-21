const console_button = document.getElementById("console_button")
const log_console = document.getElementById("console")
//const objDiv = document.getElementById("console_box");


// $('#console_text').animate({
//     scrollTop: $("#console_text").prop("scrollHeight")}, 0);
// $("#console_text").scrollTop($("#console_text")[0].scrollHeight);
// var objDiv = document.getElementById("console_text");
// objDiv.scrollTop = objDiv.scrollHeight;


// Nappula ja funktio activity login aukaisemiseen ja piilottamiseen
console_button.addEventListener("click", show_hide_console);

function show_hide_console() {
    if (log_console.classList.contains("show")){
        log_console.classList.remove("show")
    }else{
        log_console.classList.add("show")
    }
}


const console_text = document.getElementById("console_text");

// SAMPLE TEXT konsoliin
console_text.innerHTML = '24/12/2008 12:01:05 - Jeesuksesta tuli historian seksikkäin mies<br>'

// Hieno funktio, joka lisää "0" kellon ajan alkuun, esim 8:5 = 08:05
function addZero(i) {
    if (i < 10) {i = "0" + i}
    return i;
  }


axios.get("/database_functions/console/fetch_activity").then(function (response) {
    api_response = response.data;

    // Iteroidaan responsen läpi
    for (let i=0; i < Object.keys(api_response).length; i++) {

        // Luodaan uusi Date objekti mongoDB:n omasta timestampista
        var date = new Date(api_response[i]["createdAt"])

        // Tämä pätkä pitää olla yhdellä rivillä, kun frontending <pre> tagi ottaa joka koodi riveillä tehdyt linebreakit huomioon.
        // Alkulitania vain formatoi timestampin oikein, eli lisää "0" silloin kun tarvitsee.
        // Itse viimeinen muuttuja sisältää activityn.
        console_text.innerHTML += 
        `${addZero(date.getDate())}/${addZero(date.getMonth()+1)}/${date.getFullYear()} ${addZero(date.getHours())}:${addZero(date.getMinutes())}:${addZero(date.getSeconds())} - ${api_response[i]["activity"]}<br>`
    };
    //objDiv.scrollIntoView(false);//.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
    //objDiv.scrollIntoView();
})