let api_response = [{}];


// Input fields, value
const model_traindir = document.getElementById("traindir-input")
const model_testdir = document.getElementById("testdir-input")
const model_name = document.getElementById("name-input")

// Buttons
const save_button = document.getElementById("btn-submit-NN")


//Labels, progress-bar
const model_title = document.getElementById("model-title");
const model_accuracy = document.getElementById("accuracy")
const model_running_epochs = document.getElementById("running-epochs")
const progress_bar = document.getElementById("progress-bar")
const errorlabel = document.getElementById("sheetserror")
const model_structure = document.getElementById("model-structure")
const model_running_batch = document.getElementById("running-batch")
const model_epochs = document.getElementById("epochs-label")
const model_batch = document.getElementById("batch-label")

// Class where all sidebar buttons are located
const sidebar_buttons = document.getElementById("sidebarnav");

// Loading Spinners and Labels
const spinner = document.getElementById("spinner")
const load_text = document.getElementById("text-field")

// Creates sidebarButtons imported from functions.js
addSidebarButtons()


