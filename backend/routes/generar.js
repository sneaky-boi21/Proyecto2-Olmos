var express = require('express');
var plantuml = require('node-plantuml');
var axios = require('axios');
const db = require('../../config/database');

var app = express();

app.get('/png/:id([0-9]{1,3})', function (req, res) {
  res.set('Content-Type', 'image/png');

  // Query the database using the connection pool from database.js
  db.query(`SELECT archivo FROM entregas WHERE id = ${req.params.id}`)
    .then(function (results) {
      if (results.length === 0) {  
        // Handle case where no data is found
        res.status(404).send('Data not found');
      } else {
        // Get the repository link from the database results
        var repoLink = results;

        // Make the GitHub API request
        axios.get(repoLink)
          .then(function (response) {
            // Decode the base64-encoded content of the file
            var content = Buffer.from(response.data.content, 'base64').toString();

            // Generate PNG image from retrieved PlantUML code
            var decode = plantuml.decode(content);
            var gen = plantuml.generate({ format: 'png' });

            decode.out.pipe(gen.in);
            gen.out.pipe(res);
          })
          .catch(function (error) {
            // Handle error
            console.log(error);
            res.status(500).send('Internal server error');
          });
      }
    })
    .catch(function (error) {
      // Handle error
      console.log(error);
      res.status(500).send('Internal server error');
    });
});

app.listen(3000);
