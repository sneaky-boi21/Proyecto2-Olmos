window.onload = init;
var headers = {};
var url = "http://localhost:3000";
localStorage.getItem("user_id");
var userID = localStorage.getItem("user_id");

function init() {
    if(localStorage.getItem("token")) {
        token = localStorage.getItem("token");
        headers = {
            headers: {
                'Authorization': "bearer " + localStorage.getItem("token")
            }
        }
        document.querySelector('.btn-primary').addEventListener('click', insert);
        loadEntregas();
    } else {
        window.location.href = "login.html";
    }
}

function insert() {
    var id_tarea = document.getElementById('input-ID').value;
    var archivo = document.getElementById('input-file').value;


    axios({
        method: 'post',
        url: 'http://localhost:3000/sistemaEntregas/',
        data: {
            id_tarea:id_tarea,
            archivo:archivo,
            id_alumno:userID 
        }
    }).then(function(res) {
        console.log(res);
        alert("Tarea subida exitosamente");
    }).catch(function(err) {
        console.log(err);
    });
}

function loadEntregas() {
    axios.get(url + "/sistemaEntregas", headers)
    .then(function(res) {
        console.log(res);
        displayEntregas(res.data.message);
    }).catch(function(err){
        console.log(err);
    })
}

function displayEntregas(entregas) {
    // Get a reference to the table container element
    var tableContainer = document.querySelector("#table-container");
  
    // Create the table element
    var table = document.createElement("table");
  
    // Create the table header row
    var headerRow = document.createElement("tr");
    var headers = ["ID Entrega", "ID Tarea", "ID Maestro", "Calificacion", "Retroalimentacion", "Archivo"];
    headers.forEach(function (headerText) {
      var th = document.createElement("th");
      th.textContent = headerText;
      headerRow.appendChild(th);
    });
    table.appendChild(headerRow);
  
    // Create the table body rows
    entregas.forEach(function (entrega) {
      var tr = document.createElement("tr");
      var values = [entrega.id_entrega, entrega.id_tarea, entrega.id_maestro, entrega.calificacion, entrega.retroalimentacion, entrega.archivo];
      values.forEach(function (value) {
        var td = document.createElement("td");
        td.textContent = value;
        tr.appendChild(td);
      });
      table.appendChild(tr);
    });
  
    // Append the table to the table container
    tableContainer.appendChild(table);
  }
  