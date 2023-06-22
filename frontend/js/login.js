window.onload = init;
function init() {
    if(!localStorage.getItem("token")) {
        document.querySelector('.btn-secondary').addEventListener('click', function() {
            window.location.href = "signin.html"
        });
    
        document.querySelector('.btn-primary').addEventListener('click', login);      
    } else {
        //window.location.href = "login.html";
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
          loadin(res.user_mail);
          localStorage.setItem("token", res.data.message);
      } 
      else {
          alert("Inicio de sesión incorrecto");
      };
    }).catch(function(err) {
        console.log(err);
    });
}

function loadin() {
  var mail = document.getElementById('input-mail').value;

    axios({
        method: 'get',
        url: 'http://localhost:3000/user/profile/' + mail,
    }).then(function (res) {
      var userType = res.data.message;

      if (userType === 'maestro') {
        // Usuario es maestro
        window.location.href = "MaestrosPrincipal.html";
      } else if (userType === 'alumno') {
        // Usuario es estudiante
        window.location.href = "AlumnosPrincipal.html";
      } else {
        // Manejo de errores
        alert("Tipo de usuario desconocido");
      }
    }).catch(function (error) {
      console.log(error);
    });
}