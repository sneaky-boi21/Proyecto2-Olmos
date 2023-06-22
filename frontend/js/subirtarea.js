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
    var archivo = document.getElementById('input-file').value;

    axios({
        method: 'post',
        url: 'http://localhost:3000/sistema/', 
        data: {
            archivo:archivo,
        }
    }).then(function(res) {
        console.log(res);
        alert("Tarea subida exitosamente");
        }).catch(function(err) {
        console.log(err);
    })
}