let api_response = [{}];

const all_users_table = document.getElementById("all_users_table");

//const username = document.getElementsByClassName("username");
//const password = document.getElementsByClassName("password");

const select_all_checkbox = document.getElementById("mainCheckbox")
const all_checkboxes = document.getElementsByClassName("listCheckbox")

// Ylin checkbox valitsee kaikki muut boxit
select_all_checkbox.addEventListener("click", function(event){
    if(this.checked) {
        for (let i = 0; i<all_checkboxes.length; i++) {
            all_checkboxes[i].checked = true;
        }
    }else{
        for (let i = 0; i<all_checkboxes.length; i++) {
            all_checkboxes[i].checked = false;
        }
    }
});


axios.get("/users/get_users").then(function (response) {
    console.log(response.data[0]["username"]);
    console.log(response.data);
    api_response = response.data;

    // Iteroidaan response ja luodaan uusi rivi tauluun jossa käyttäjän tiedot
    for (let i=0; i < Object.keys(api_response).length; i++) {
        all_users_table.innerHTML += 
        `<tr>
            <th>
                <label class="customcheckbox">
                <input type="checkbox" class="listCheckbox" />
                <span class="checkmark"></span>
                </label>
            </th>
            <td class="username">${api_response[i]["username"]}</td>
            <td class="password">****</td>
        </tr>`
        document.getElementById("zero_config_info").innerHTML = `Showing 1 to ${i+1} of ${i+1} entries`;
    }

    // for (let i = 0; i < Object.keys(api_response).length; i++) {
    //     addButton(sidebar_buttons, api_response[i]["modelName"], i);
    //     addButtonEventListener(`sidebar-button-${i}`, api_response);
    // }
    // document.getElementById("sidebar-button-0").click();
});


const username_field = document.getElementById("username_field");
const password_field = document.getElementById("password_field");
const is_admin_yes = document.getElementById("is_admin_yes");
const is_admin_no = document.getElementById("is_admin_no");
const message_box = document.getElementById("message_box");

const submit_user = document.getElementById("submit_user");
const user_error  = document.getElementById("usererror");
const user_success = document.getElementById("usersuccess");

submit_user.addEventListener("click", SubmitUserButton);

function SubmitUserButton() {
    message_box.innerHTML = "Added user: " + username_field.value

    if(is_admin_yes.checked){
        var is_admin_confirm = true;
    }
    else if(is_admin_no.checked){
        var is_admin_confirm = false;
    }
    // POST request for remote image in node.js
    axios({
        method: "post",
        url: "/users/add",
        data: {
            username: username_field.value,
            password: password_field.value,
            admin: is_admin_confirm
        },
    }).then(function (response) {
        user_error.style = "display: none;"
        console.log("Created a new user!");
        console.log(response.message);
        user_success.style = "display: block;"
        user_success.innerHTML = "User added succesfully!"
        location.reload()

    }).catch(err => {
        console.log("Couldn't create a new user...");
        console.log(err)
        user_error.style = "display: block;"
        user_error.innerHTML = err

    })
};


function DeleteUserButton() {
    const checkboxes = document.querySelectorAll('input:checked');
    const delete_output = document.getElementById('delete_output');

    var deleted_users = []

    for (let i=0; i < checkboxes.length; i++){
        console.log(checkboxes[i].parentNode.parentNode.parentNode)
        var parent = checkboxes[i].parentNode.parentNode.parentNode
        console.log(parent.children[1])
        deleted_users.push(parent.children[1].innerHTML)
        //console.log(user_entry[i].value)
    }
    delete_output.innerHTML = "Deleted user(s): " + deleted_users

    axios({
        method: "post",
        url: "/users/delete_users",
        data: {
            username: deleted_users
        },
    }).then(function (response) {
        console.log("Successfully deleted user(s).");
        location.reload()

    }).catch(err => {
        console.log("Couldn't delete user(s)...", err.message);

    })

    // docker run --net graylog_network `
    //  --name elasticsearch -e "http.host=0.0.0.0" `
    //  -e "discovery.type=single-node" `
    //  -e "ES_JAVA_OPTS=-Xms512m -Xmx512m" `
    //  -d docker.elastic.co/elasticsearch/elasticsearch-oss:7.10.2

    // docker run --network graylog_network `
    // --name graylog `
    // --link elasticsearch --link mongodb:mongo `
    // -p 9000:9000 -p 12201:12201 -p 1514:1514 `
    // -e GRAYLOG_HTTP_EXTERNAL_URI="http://127.0.0.1:9000/" `
    // -e GRAYLOG_HTTP_ENABLE_CORS=true `
    // -e GRAYLOG_PASSWORD_SECRET=gRayYyL0gRul3zD4WurLd!1 `
    // -e GRAYLOG_ROOT_PASSWORD_SHA2=4B961BC05C48D0B253755B22E3DC339407F9182B08EA0A9FC03D5AD3DE37D3D8 `
    // -d graylog/graylog:4.2

    // if(is_admin_yes.checked){
    //     var is_admin_confirm = true;
    // }
    // else if(is_admin_no.checked){
    //     var is_admin_confirm = false;
    // }
    // // POST request for remote image in node.js
    // axios({
    //     method: "post",
    //     url: "/users/add",
    //     data: {
    //         username: username_field.value,
    //         password: password_field.value,
    //         admin: is_admin_confirm
    //     },
    // }).then(function (response) {
    //     user_error.style = "display: none;"
    //     console.log("Created a new user!");
    //     console.log(response.message);
    //     user_success.style = "display: block;"
    //     user_success.innerHTML = "User added succesfully!"

    // }).catch(err => {
    //     console.log("Couldn't create a new user...");
    //     console.log(err)
    //     user_error.style = "display: block;"
    //     user_error.innerHTML = err

    // })
};
