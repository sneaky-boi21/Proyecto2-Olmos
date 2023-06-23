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
        loadAlumnos();
    } else {
        window.location.href = "login.html";
    }
}

function loadAlumnos() {
    axios.get(url + "/user", headers)
    .then(function(res) {
        console.log(res);
        displayAlumnos(res.data.message);
    }).catch(function(err){
        console.log(err);
    })
}

function displayAlumnos(user) {
    // Establezca el valor user_type deseado
    var desiredUserType = 'alumno';

    // Filtrar el array de usuarios para incluir sólo los usuarios con el valor user_type deseado
    var filteredUser = user.filter(function(u) {
        return u.user_type === desiredUserType;
    });

    // Crear un elemento de tabla
    var table = document.createElement('table');

    // Crear una fila para las cabeceras de la tabla
    var headerRow = document.createElement('tr');
    var idHeader = document.createElement('th');
    idHeader.textContent = 'ID';
    headerRow.appendChild(idHeader);
    var nameHeader = document.createElement('th');
    nameHeader.textContent = 'Nombres';
    headerRow.appendChild(nameHeader);
    var surnameHeader = document.createElement('th');
    surnameHeader.textContent = 'Apellidos';
    headerRow.appendChild(surnameHeader);
    var emailHeader = document.createElement('th');
    emailHeader.textContent = 'Correo';
    headerRow.appendChild(emailHeader);
    table.appendChild(headerRow);

    // Crear una fila para cada usuario
    for (var i = 0; i < filteredUser.length; i++) {
        var row = document.createElement('tr');
        var idCell = document.createElement('td');
        idCell.textContent = filteredUser[i].user_id;
        row.appendChild(idCell);
        var nameCell = document.createElement('td');
        nameCell.textContent = filteredUser[i].user_name;
        row.appendChild(nameCell);
        var surnameCell = document.createElement('td');
        surnameCell.textContent = filteredUser[i].user_surname;
        row.appendChild(surnameCell);
        var emailCell = document.createElement('td');
        emailCell.textContent = filteredUser[i].user_mail;
        row.appendChild(emailCell);
        table.appendChild(row);
    }

    // Añadir la tabla al elemento contenedor
    var container = document.querySelector('#table-container');
    container.appendChild(table);
}
