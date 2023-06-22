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
    var materia = document.getElementById('input-subject').value;
    var fecha_entrega = document.getElementById('input-date').value;

    axios({
        method: 'post',
        url: 'http://localhost:3000/sistema/', 
        data: {
            nombre:nombre,
            materia:materia,
            fecha_entrega:fecha_entrega,
        }
    }).then(function(res) {
        console.log(res);
        alert("Tarea creada exitosamente");
        }).catch(function(err) {
        console.log(err);
    })
}