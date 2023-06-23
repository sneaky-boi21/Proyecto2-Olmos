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
    // Set the desired user_type value
    var desiredUserType = 'alumno';

    // Filter the user array to only include users with the desired user_type value
    var filteredUser = user.filter(function(u) {
        return u.user_type === desiredUserType;
    });

    // Create a table element
    var table = document.createElement('table');

    // Create a row for the table headers
    var headerRow = document.createElement('tr');
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

    // Create a row for each user
    for (var i = 0; i < filteredUser.length; i++) {
        var row = document.createElement('tr');
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

    // Append the table to the container element
    var container = document.querySelector('#table-container');
    container.appendChild(table);
}
