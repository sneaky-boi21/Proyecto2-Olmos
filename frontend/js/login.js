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
          console.log(res.data)
          userID(res.user_mail);
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

function userID() {
  var mail = document.getElementById('input-mail').value;

    axios({
        method: 'get',
        url: 'http://localhost:3000/user/userID/' + mail,
    }).then(function (res) {
      console.log(res.data)
      // Almacena el ID de usuario utilizando localStorage.setItem()
      var user_id = res.data.message; // Recuperar el ID de usuario de la respuesta
      console.log('User ID:', user_id);
      localStorage.setItem("user_id", user_id);

    }).catch(function (error) {
      console.log(error);
    });
}