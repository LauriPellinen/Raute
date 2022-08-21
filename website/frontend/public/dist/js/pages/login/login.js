


// LABELS//
const username = document.getElementById("username-field");
const password = document.getElementById("password-field");
const loginerror = document.getElementById("loginerror");
// post function that sends userdata to server
function submitData(){
    console.log(username.value)
    axios({
        method: "post",
        url: "/users/login",
        data: {
          uname: username.value,
          pw: password.value,
        },
      }).then(function () {
        if (window.location.pathname == '/users/login'){
            window.location = "/";
        } else {
            window.location = window.location.pathname;
        }
        
    
      }).catch(err => {
        console.log(err)
        loginerror.style = "display: block;"

      })
    
}