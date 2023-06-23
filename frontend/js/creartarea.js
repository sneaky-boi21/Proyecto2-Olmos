window.onload = init;
var headers = {};
var url = "http://localhost:3000";

function init() {
    document.querySelector('.btn-primary').addEventListener('click', insert); 
    }      

function insert() {
    var nombre_tarea = document.getElementById('input-name').value;
    var materia = document.getElementById('input-subject').value;
    var detalles = document.getElementById('input-desc').value;
    var fecha_entrega = document.getElementById('input-date').value;

    axios({
        method: 'post',
        url: 'http://localhost:3000/sistemaTareas/', 
        data: {
            nombre_tarea:nombre_tarea,
            materia:materia,
            detalles:detalles,
            fecha_entrega:fecha_entrega,
        }
    }).then(function(res) {
        console.log(res);
        alert("Tarea creada exitosamente");
        }).catch(function(err) {
        console.log(err);
    })
}