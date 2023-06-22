var express = require('express');
var plantuml = require('node-plantuml');
var fs = require('fs');
const db = require('../../config/database');

var app = express();

app.get('/png/:id', function(req, res) {
    res.set('Content-Type', 'image/png');

    // Query the database using the connection pool from database.js
    db.query('SELECT archivo FROM tareas WHERE id = ?', [req.params.id])
        .then(function(results) {
            if (results.length === 0) {
                // Handle case where no data is found
                res.status(404).send('Data not found');
            } else {
                // Generate PNG image from retrieved PlantUML code
                var decode = plantuml.decode(results[0].uml);
                var gen = plantuml.generate({format: 'png'});

                decode.out.pipe(gen.in);
                gen.out.pipe(res);
            }
        })
        .catch(function(error) {
            // Handle error
            console.log(error);
            res.status(500).send('Internal server error');
        });
});

app.listen(3000);
