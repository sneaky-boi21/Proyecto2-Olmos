/*window.onload = init;
function init() {
    if(!localStorage.getItem("token")) {
        document.querySelector('.btn-secondary').addEventListener('click', function() {
            window.location.href = "signin.html"
        });
    
        document.querySelector('.btn-primary').addEventListener('click', login);      
    } else {
        window.location.href = "MenuPrinc.html";
    }

};


function login() {
    var mail = document.getElementById('input-mail').value;
    var pass = document.getElementById('input-password').value;

    axios({
        method: 'post',
        url: 'http://localhost:3000/user/login',
        data: {
            user_mail:mail,
            user_password:pass
        }
    }).then(function(res) {
        if(res.data.code === 200) {
            localStorage.setItem("token", res.data.message);
            window.location.href = "MenuPrinc.html";
        } 
        else {
            alert("Inicio de sesión incorrecto");
        };
    }).catch(function(err) {
        console.log(err);
    })
} */

window.onload = init;

function init() {
    if (!localStorage.getItem("token")) {
        document.querySelector('.btn-secondary').addEventListener('click', function () {
            window.location.href = "signin.html";
        });

        document.querySelector('.btn-primary').addEventListener('click', login);
    } else {
        window.location.href = "MenuPrinc.html";
    }
}

function login() {
    var mail = document.getElementById('input-mail').value;
    var pass = document.getElementById('input-password').value;

    axios({
        method: 'post',
        url: 'http://localhost:3000/user/login',
        data: {
            user_mail: mail,
            user_password: pass
        }
    }).then(function (res) {
        if (res.data.code === 200) {
            localStorage.setItem("token", res.data.message);

            axios({
                method: 'get',
                url: 'http://localhost:3000/user/',
                headers: {
                    Authorization: 'Bearer ' + res.data.message
                }
            }).then(function (response) {
                var userType = response.data.message;
                console.log(res);
                if (userType === 'maestro') {
                    //Usuario es maestro
                    window.location.href = "Maestros1.html";
                } else if (userType === 'alumno') {
                    //Usurio es estudiante
                    window.location.href = "Alumnos1.html";
                } else {
                    //Manejo de errores
                    alert("Tipo de usuario desconocido");
                }
            }).catch(function (error) {
                console.log(error);
            });

        } else {
            alert("Inicio de sesión incorrecto");
        }
    }).catch(function (err) {
        console.log(err);
    });
}
