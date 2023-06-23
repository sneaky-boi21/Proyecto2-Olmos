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
    axios.get(url + "/sistemaTareas", headers)
    .then(function(res) {
        console.log(res);
        displayTareas(res.data.message);
    }).catch(function(err){
        console.log(err);
    })
}

function displayTareas(tareas) {
    // Create a table element
    var table = document.createElement('table');

    // Create a row for the table headers
    var headerRow = document.createElement('tr');
    var idHeader = document.createElement('th');
    idHeader.textContent = 'ID Tarea';
    headerRow.appendChild(idHeader);
    var nameHeader = document.createElement('th');
    nameHeader.textContent = 'Nombre Tarea';
    headerRow.appendChild(nameHeader);
    var subjectHeader = document.createElement('th');
    subjectHeader.textContent = 'Materia';
    headerRow.appendChild(subjectHeader);
    var dueDateHeader = document.createElement('th');
    dueDateHeader.textContent = 'Fecha de Entrega';
    headerRow.appendChild(dueDateHeader);
    var teacherHeader = document.createElement('th');
    teacherHeader.textContent = 'ID Profesor';
    headerRow.appendChild(teacherHeader);
    table.appendChild(headerRow);

    // Create a row for each tarea
    for (var i = 0; i < tareas.length; i++) {
        var row = document.createElement('tr');
        var idCell = document.createElement('td');
        idCell.textContent = tareas[i].id_tarea;
        row.appendChild(idCell);
        var nameCell = document.createElement('td');
        nameCell.textContent = tareas[i].nombre_tarea;
        row.appendChild(nameCell);
        var subjectCell = document.createElement('td');
        subjectCell.textContent = tareas[i].materia;
        row.appendChild(subjectCell);
        var dueDateCell = document.createElement('td');
        dueDateCell.textContent = tareas[i].fecha_entrega;
        row.appendChild(dueDateCell);
        var teacherCell = document.createElement('td');
        teacherCell.textContent = tareas[i].id_profesor;
        row.appendChild(teacherCell);
        table.appendChild(row);
    }

    // Append the table to the container element
    var container = document.querySelector('#table-container');
    container.appendChild(table);
}