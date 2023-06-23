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
        loadEntregas();
    } else {
        window.location.href = "login.html";
    }
}

function loadEntregas() {
    axios.get(url + "/sistema", headers)
    .then(function(res) {
        console.log(res);
        displayEntregas(res.data.message);
    }).catch(function(err){
        console.log(err);
    })
}

function displayEntregas(entregas) {
    var body = document.querySelector("body");
    body.innerHTML += `

    <table>
    <tr>
      <th>Nombre</th>
      <th>Apellidos</th>
      <th>Telefono</th>
      <th>Correo</th>
      <th>Direccion</th>
    </tr>`
    for( var i = 0; i < empleados.length; i++) {


        body.innerHTML +=  
        `<table>
        <tr>
        <h3>
          <td>${empleados[i].nombre}</td>
          <td>${empleados[i].apellidos}</td>
          <td>${empleados[i].telefono}</td>
          <td>${empleados[i].correo}</td>
          <td>${empleados[i].direccion}</td>
        </h3>
        </tr>
        </table>`
    } 
    body.innerHTML +=  `</table>`; 
}