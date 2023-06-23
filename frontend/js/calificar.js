window.onload = init;
var headers = {};
var url = "http://localhost:3000";

function init() {
    document.querySelector('.btn-primary').addEventListener('click', update);    
}

function update() {
    var id_entrega = document.getElementById('input-id').value;

        axios({
            method: 'patch',
            url: `http://localhost:3000/sistemaEntregas/${id_entrega}`,
            data: {
                id_tarea:id_tarea,
                id_alumno:id_alumno,
                calificacion:calificacion,
                retroalimentacion:retroalimentacion,
                archivo:archivo
            }
        }).then(function(res) {
            console.log(res);
            alert("Update exitoso");
            }).catch(function(err) {
            console.log(err);
        })
    }