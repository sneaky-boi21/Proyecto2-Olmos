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

    if(nombre && apellidos && telefono && correo && direccion) {
            axios({
            method: 'put',
            url: `http://localhost:3000/sistema/${id_empleado}`,
            data: {
                id_empleado:id_empleado
            }
        }).then(function(res) {
            console.log(res);
            alert("Update exitoso");
            }).catch(function(err) {
            console.log(err);
        })
    } else {
        axios({
            method: 'patch',
            url: `http://localhost:3000/sistema/${id_empleado}`,
            data: {
                nombre:nombre,
                apellidos:apellidos,
                telefono:telefono,
                correo:correo,
                direccion:direccion,
                id_empleado:id_empleado
            }
        }).then(function(res) {
            console.log(res);
            alert("Update exitoso");
            }).catch(function(err) {
            console.log(err);
        })
    }
}