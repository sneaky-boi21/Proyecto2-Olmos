// Set the id of the data you want to retrieve
var id = 1;

// Make a GET request to the /png/:id route using axios
axios.get('/png/' + id, { responseType: 'blob' })
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