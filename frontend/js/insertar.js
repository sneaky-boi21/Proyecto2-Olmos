window.onload = init;
var headers = {};
var url = "http://localhost:3000";

function init() {
    document.querySelector('.btn-secondary').addEventListener('click', function() {
        window.location.href = "sistema.html"
    });

    document.querySelector('.btn-primary').addEventListener('click', insert); 
    }      

function insert() {
    var nombre = document.getElementById('input-name').value;
    var apellidos = document.getElementById('input-surname').value;
    var telefono = document.getElementById('input-phone').value;
    var correo = document.getElementById('input-mail').value;
    var direccion = document.getElementById('input-address').value;

    axios({
        method: 'post',
        url: 'http://localhost:3000/sistema/', 
        data: {
            nombre:nombre,
            apellidos:apellidos,
            telefono:telefono,
            correo:correo,
            direccion:direccion
        }
    }).then(function(res) {
        console.log(res);
        alert("Insert exitoso");
        }).catch(function(err) {
        console.log(err);
    })
}