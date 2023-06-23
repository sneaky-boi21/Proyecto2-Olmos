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

        // Select the existing input element using its id
        var input = document.getElementById('input-ID');

        // Select the existing button element
        var button = document.querySelector('.btn-primary');

        // Add an event listener to the button to handle the user's submission
        button.addEventListener('click', function() {
            // Get the id entered by the user
            var id = input.value;

            // Make a GET request to the /png/:id route using axios
            axios.get(url + '/png/' + id, { responseType: 'blob' })
                .then(function(response) {
                    // Create an object URL from the blob data
                    var url = URL.createObjectURL(response.data);

                    // Create an img element and set its src to the object URL
                    var img = document.createElement('img');
                    img.src = url;

                    // Append the img element to the page
                    document.body.appendChild(img);
                })
                .catch(function(error) {
                    // Handle error
                    console.log(error);
                });
        });
    } else {
        window.location.href = "login.html";
    }
}
