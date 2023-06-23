window.onload = init;
var headers = {};
var url = "http://localhost:3000";
localStorage.getItem("user_ID")
const userID = localStorage.getItem("user_ID");

function init() {
    if(localStorage.getItem("token")) {
        token = localStorage.getItem("token");
        headers = {
            headers: {
               'Authorization': "bearer " + localStorage.getItem("token")
            }
        }
        document.querySelector('.btn-primary').addEventListener('click', insert); 
    } else {
        window.location.href = "login.html";
    }
}

function insert() {
    var archivo = document.getElementById('input-file').value;


    axios({
        method: 'post',
        url: 'http://localhost:3000/sistemaEntregas/',
        data: {
            archivo: archivo,
            user_id: userID 
        }
    }).then(function(res) {
        console.log(res);
        alert("Tarea subida exitosamente");
    }).catch(function(err) {
        console.log(err);
    });
}