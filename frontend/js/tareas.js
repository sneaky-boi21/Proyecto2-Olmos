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
        loadTareas();
    } else {
        window.location.href = "login.html";
    }
}

function loadTareas() {
    axios.get(url + "/sistema", headers)
    .then(function(res) {
        console.log(res);
        displayTareas(res.data.message);
    }).catch(function(err){
        console.log(err);
    })
}

function displayTareas(tareas) {
    var body = document.querySelector("Body");
    body.innerHTML += `

    <table>
    <tr>
      <th>ID Tarea</th>
      <th>Nombre Tarea</th>
      <th>Materia</th>
      <th>Calificacion</th>
      <th>Fecha de Entrega</th>
      <th>Retroalimentacion</th>
      <th>Archivo</th>
    </tr>`
    for( var i = 0; i < tareas.length; i++) {

        body.innerHTML +=  
        `<table>
        <tr>
        <h3>
          <td>${tareas[i].id_tarea}</td>
          <td>${tareas[i].nombre_tarea}</td>
          <td>${tareas[i].materia}</td>
          <td>${tareas[i].fecha_entrega}</td>
          <td>${tareas[i].retroalimentacion}</td>
          <td>${tareas[i].archivo}</td>
        </h3>
        </tr>
        </table>`
    } 
    body.innerHTML +=  `</table>`; 
} 