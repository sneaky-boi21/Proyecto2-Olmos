var express = require('express');
var plantuml = require('node-plantuml');
var fs = require('fs');

var app = express();
 
app.get('/png/:uml', function(req, res) {
    res.set('Content-Type', 'image/png');
   
    var decode = plantuml.decode(req.params.uml);
    var gen = plantuml.generate({format: 'png'});
   
    decode.out.pipe(gen.in);
    gen.out.pipe(res);
  });

  app.listen(3000);