window.onload = init;
var headers = {};
var url = "http://localhost:3000";

function init() {
    if(localStorage.getItem("token")) {
        token = localStorage.getItem("token");
        headers = {
            headers: {
                'Authorization': "bearer " + localStorage.getItem("token")
            }
        }
        loadCalificaciones();
    } else {
        window.location.href = "index.html";
    }
}

function loadCalificaciones() {
    axios.get(url + "/sistema", headers)
    .then(function(res) {
        console.log(res);
        displayCalificaciones(res.data.message);
    }).catch(function(err){
        console.log(err);
    })
}

function displayCalificaciones(tareas) {
    var body = document.querySelector("Body");
    body.innerHTML += `

    <table>
    <tr>
      <th>ID Tarea</th>
      <th>Nombre Tarea</th>
      <th>Calificacion</th>
    </tr>`
    for( var i = 0; i < tareas.length; i++) {

        body.innerHTML +=  
        `<table>
        <tr>
        <h3>
          <td>${tareas[i].id_tarea}</td>
          <td>${tareas[i].nombre_tarea}</td>
          <td>${tareas[i].calificacion}</td>
        </h3>
        </tr>
        </table>`
    } 
    body.innerHTML +=  `</table>`; 
}