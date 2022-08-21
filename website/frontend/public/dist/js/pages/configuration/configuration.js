// Input fields, value
const model_epochs = document.getElementById("epochs-input")
const model_batch = document.getElementById("batch-input")

// Buttons, event
const save_button = document.getElementById("btn-submit-NN")
const start_button = document.getElementById("btn-start-training")
const stop_button = document.getElementById("btn-stop-training")


// Labels, innerHTML
const model_title = document.getElementById("model-title");
const success_laabel = document.getElementById("confsuccess");
const errorlabel = document.getElementById("conferror");
const load_text = document.getElementById("text-field")
const spinner = document.getElementById("spinner")

// Classes, sidebar_buttons & datasetDropdown
const sidebar_buttons = document.getElementById("sidebarnav");
const datasetObject = document.getElementById("dataset-name")
const start_spinner = document.getElementById("spinner-start")


// Required for observing changes when pressing save-settings button
var original_model_title = ""
var original_model_name = ""
var original_model_epochs = 0
var original_model_batch = 0
var list_of_model_values = []




// --------- BUTTONS ------------- //
// START | STOP | SAVE | Sidebar | //
// -------------------------------//

// Creates sidebarButtons imported from functions.js
addSidebarButtons()

// Creates datasetNames to dropdown, imported from functions.js
DatasetNamesToList(datasetObject)


// EventListeners imported from startstopsaveButton.js
start_button.addEventListener("click", startTrainingButton);
stop_button.addEventListener("click", stopTrainingButton);
save_button.addEventListener("click", savesettingsButton);





// ---------------------------------//
// PARAMETRIEN MUUTOKSIEN TARKISTUS //
// ---------------------------------//

// Tämä funktio chekkaa onko parametrien input kenttiin tullut muutoksia
function observeElement(element, property, callback, delay = 0) {
    let elementPrototype = Object.getPrototypeOf(element);
    if (elementPrototype.hasOwnProperty(property)) {
        let descriptor = Object.getOwnPropertyDescriptor(elementPrototype, property);
        Object.defineProperty(element, property, {
            get: function() {
                return descriptor.get.apply(this, arguments);
            },
            set: function () {
                let oldValue = this[property];
                descriptor.set.apply(this, arguments);
                let newValue = this[property];
                if (typeof callback == "function") {
                    setTimeout(callback.bind(this, oldValue, newValue), delay);
                }
                return newValue;
            }
        });
    }
}

const form_control = document.getElementsByClassName("form-control")

// getElementsByClassName palauttaa Node-listan, 
// se pitää muuttaa arrayksi että voi käyttää sen funktioita.
let elementsArray = Array.prototype.slice.call(form_control);

// Looppaa elementit ja lisää muutos listenerin.
elementsArray.forEach(function(elem){
    // "blur"-metodi kuuntelee vasta, kun klikkaa pois input-kentästä.
    elem.addEventListener("blur", function () {
        console.log("Input value changed via UI. New value: '%s'", this.value);
    });
})







