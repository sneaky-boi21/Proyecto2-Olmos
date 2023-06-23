var express = require('express');
const generar = express.Router();
var plantuml = require('node-plantuml');
var axios = require('axios');
const db = require('../../config/database');

generar.get('/png/:id([0-9]{1,3})', function (req, res) {
  res.set('Content-Type', 'image/png');

  // Consulta la base de datos utilizando el pool de conexiones desde database.js
  db.query(`SELECT archivo FROM entregas WHERE id = ${req.params.id}`)
    .then(function (results) {
      if (results.length === 0) {  
        // Manejar el caso en el que no se encuentran datos
        res.status(404).send('Data not found');
      } else {
        // Obtener el enlace del repositorio a partir de los resultados de la base de datos
        var repoLink = results;

        // Realiza la solicitud de la API de GitHub
        axios.get(repoLink)
          .then(function (response) {
            // Decodificar el contenido codificado en base64 del archivo
            var content = Buffer.from(response.data.content, 'base64').toString();

            // Generar imagen PNG a partir del código PlantUML
            var decode = plantuml.decode(content);
            var gen = plantuml.generate({ format: 'png' });

            decode.out.pipe(gen.in);
            gen.out.pipe(res);
          })
          .catch(function (error) {
            // Manejar error
            console.log(error);
            res.status(500).send('Internal server error');
          });
      }
    })
    .catch(function (error) {
      // Manejar error
      console.log(error);
      res.status(500).send('Internal server error');
    });
});

module.exports = generar;