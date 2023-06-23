window.onload = init;
var headers = {};
var url = "http://localhost:3000";
localStorage.getItem("user_id");
var userID = localStorage.getItem("user_id");

function init() {
    if(localStorage.getItem("token")) {
        token = localStorage.getItem("token");
        headers = {
            headers: {
                'Authorization': "bearer " + localStorage.getItem("token")
            }
        }

        // Selecciona el elemento de entrada existente utilizando su id
        var input = document.getElementById('input-ID');

        // Selecciona el elemento de botón existente
        var button = document.querySelector('.btn-primary');

        // Añade un receptor de eventos al botón para gestionar el envío del usuario
        button.addEventListener('click', function() {
            // Obtener el id introducido por el usuario
            var id = input.value;

            // Realiza una petición GET a la ruta /png/:id utilizando axios
            axios.get(url + '/png/' + id, { responseType: 'blob' })
                .then(function(response) {
                    // Crear una URL de objeto a partir de los datos blob
                    var url = URL.createObjectURL(response.data);

                    // Crea un elemento img y establece su src a la URL del objeto
                    var img = document.createElement('img');
                    img.src = url;

                    // Añadir el elemento img a la página
                    document.body.appendChild(img);
                })
                .catch(function(error) {
                    // Manejar error
                    console.log(error);
                });
        });
    } else {
        window.location.href = "login.html";
    }
}
