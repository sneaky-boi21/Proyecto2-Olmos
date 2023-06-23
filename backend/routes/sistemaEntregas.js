const express = require('express');
const entregas = express.Router();
const db = require('../../config/database');

entregas.post("/", async (req, res, next) => {
    const { id_tarea, id_alumno, calificacion, retroalimentacion, archivo } = req.body;
  
    if (id_tarea && id_alumno) {
      let columns = ["id_tarea", "id_alumno"];
      let values = [id_tarea, id_alumno];
  
      if (calificacion) {
        columns.push("calificacion");
        values.push(calificacion);
      }
      if (retroalimentacion) {
        columns.push("retroalimentacion");
        values.push(retroalimentacion);
      }
      if (archivo) {
        columns.push("archivo");
        values.push(archivo);
      }
  
      let query = `INSERT INTO tareas(${columns.join(",")}) VALUES (${values.map(() => "?").join(",")})`;
  
      const rows = await db.query(query, values);
  
      if (rows.affectedRows == 1) {
        return res.status(201).json({ code: 201, message: "Tarea creada correctamente" });
      }
      return res.status(500).json({ code: 500, message: "Ocurrió un error" });
    }
    return res.status(500).json({ code: 500, message: "Campos incompletos" });
  });
 
entregas.delete("/:id([0-9]{1,3})", async (req, res, next) => {
    const query = `DELETE FROM tareas WHERE id_tarea=${req.params.id}`;
    const rows = await db.query(query);

    if (rows.affectedRows == 1) {
            return res.status(200).json({ code: 200, message: "Tarea eliminada correctamente"});
    }
    return res.status(404).json({code: 404, message: "Tarea no encontrado"});
});

entregas.put("/:id([0-9]{1,3})", async (req, res, next) => {
    const {nombre_tarea, materia, detalles, calificacion, fecha_entrega, id_profesor, id_alumno, retroalimentacion, archivo} = req.body;

    if(nombre_tarea, materia && detalles && calificacion && fecha_entrega && id_profesor && id_alumno && retroalimentacion && archivo) {
        let query = `UPDATE tareas SET nombre_tarea='${nombre_tarea}',materia='${materia}',detalles='${detalles}', calificacion='${calificacion}',
        fecha_entrega='${fecha_entrega}',id_profesor='${id_profesor}',id_alumno='${id_alumno}'
        ,retroalimentacion='${retroalimentacion}',archivo='${archivo}' WHERE id_tarea=${req.params.id};`;
    
        const rows = await db.query(query);
        
        if(rows.affectedRows == 1) {
            return res.status(200).json({code: 200, message: "Tarea actualizada correctamente"});
        }
        return res.status(500).json({code: 500, message: "Ocurrió un error"});
    }
    return res.status(500).json({code: 500, message: "Campos incompletos"});
    
});

entregas.patch("/:id([0-9]{1,3})", async (req, res, next) => {
   
    if (req.body.archivo) {
        let query = `UPDATE entregas SET archivo='${req.body.archivo}' WHERE id_tarea=${req.params.id};`;
        const rows = await db.query(query);
        
        if(rows.affectedRows == 1) {
            return res.status(200).json({code: 200, message: "Tarea actualizada correctamente"});
        }
        return res.status(500).json({code: 500, message: "Ocurrió un error"});
    }
    return res.status(500).json({code: 500, message: "Campos incompletos"});
});

entregas.get("/", async (req, res, next) => {
    const pkmn = await db.query("SELECT * FROM entregas");;
    return res.status(200).json({ code: 200, message: pkmn});
});

entregas.get('/:id([0-9]{1,3})', async (req, res, next) => {
    const id = req.params.id - 1;
    if (id >= 1 && id <= 1000) {
        const pkmn = await db.query("SELECT * FROM entregas WHERE id_tarea="+id+";");
        return res.status(200).json({ code: 200, message: pkmn});
    }
        return res.status(404).send({ code: 404, message: "Tarea no encontrada"});
}); 

entregas.get('/:name([A-Za-z]+)', async (req, res, next) => {
    const name = req.params.name;

    const pkmn = await db.query(`SELECT * FROM entregas WHERE materia='${name}'`);
    if (name.length > 0) {
        return res.status(200).json(pkmn);
    }
        return res.status(404).send({ code: 404, message: "Tarea no encontrada"});

});

module.exports = entregas;