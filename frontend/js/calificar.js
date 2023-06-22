window.onload = init;
var headers = {};
var url = "http://localhost:3000";

function init() {
    document.querySelector('.btn-secondary').addEventListener('click', function() {
        window.location.href = "sistema.html"
    });

    document.querySelector('.btn-primary').addEventListener('click', update);    
}

function update() {
    var id_tarea = document.getElementById('input-id').value;

    if(nombre_tarea && materia && calificacion && fecha_entrega && id_profesor && id_alumno && retroalimentacion && archivo) {
            axios({
            method: 'put',
            url: `http://localhost:3000/sistema/${id_tarea}`,
            data: {
                id_tarea:id_tarea
            }
        }).then(function(res) {
            console.log(res);
            alert("Actualizacion exitosa");
            }).catch(function(err) {
            console.log(err);
        })
    } else {
        axios({
            method: 'patch',
            url: `http://localhost:3000/sistema/${id_tarea}`,
            data: {
                calificacion:calificacion,
            }
        }).then(function(res) {
            console.log(res);
            alert("Calificado correctamente");
            }).catch(function(err) {
            console.log(err);
        })
    }
}