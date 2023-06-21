const express = require('express');
const tareas = express.Router();
const db = require('../../config/database');


tareas.post("/", async (req, res, next) => {
    const {materia, calificacion, fecha_entrega, id_profesor, id_alumno, retroalimentacion, archivo} = req.body;

    if(materia && calificacion && fecha_entrega && id_profesor && id_alumno && retroalimentacion && archivo) {
        let query = "INSERT INTO tareas(materia, calificacion, fecha_entrega, id_profesor, id_alumno, retroalimentacion, archivo)";
        query += ` VALUES ('${materia}', '${calificacion}', '${fecha_entrega}', '${id_profesor}', 
        '${id_alumno}', '${retroalimentacion}', '${archivo}')`;
    
        const rows = await db.query(query);
        
        if(rows.affectedRows == 1) {
            return res.status(201).json({code: 201, message: "Tarea creada correctamente"});
        }
        return res.status(500).json({code: 500, message: "Ocurrió un error"});
    }
    return res.status(500).json({code: 500, message: "Campos incompletos"});
});

tareas.delete("/:id([0-9]{1,3})", async (req, res, next) => {
    const query = `DELETE FROM tareas WHERE id_tarea=${req.params.id}`;
    const rows = await db.query(query);

    if (rows.affectedRows == 1) {
            return res.status(200).json({ code: 200, message: "Tarea eliminada correctamente"});
    }
    return res.status(404).json({code: 404, message: "Tarea no encontrado"});
});

tareas.put("/:id([0-9]{1,3})", async (req, res, next) => {
    const { materia, calificacion, fecha_entrega, id_profesor, id_alumno, retroalimentacion, archivo} = req.body;

    if(materia && calificacion && fecha_entrega && id_profesor && id_alumno && retroalimentacion && archivo) {
        let query = `UPDATE tareas SET materia='${materia}',calificacion='${calificacion}',
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

tareas.patch("/:id([0-9]{1,3})", async (req, res, next) => {
   
    if (req.body.materia) {
        let query = `UPDATE tareas SET materia='${req.body.materia}' WHERE id_tarea=${req.params.id};`;
        const rows = await db.query(query);
        
        if(rows.affectedRows == 1) {
            return res.status(200).json({code: 200, message: "Tarea actualizada correctamente"});
        }
        return res.status(500).json({code: 500, message: "Ocurrió un error"});
    }
    return res.status(500).json({code: 500, message: "Campos incompletos"});
});

tareas.get("/", async (req, res, next) => {
    const pkmn = await db.query("SELECT * FROM tareas");;
    return res.status(200).json({ code: 200, message: pkmn});
});

tareas.get('/:id([0-9]{1,3})', async (req, res, next) => {
    const id = req.params.id - 1;
    if (id >= 1 && id <= 1000) {
        const pkmn = await db.query("SELECT * FROM tareas WHERE id_tarea="+id+";");
        return res.status(200).json({ code: 200, message: pkmn});
    }
        return res.status(404).send({ code: 404, message: "Tarea no encontrada"});
}); 

tareas.get('/:name([A-Za-z]+)', async (req, res, next) => {
    const name = req.params.name;

    const pkmn = await db.query(`SELECT * FROM tareas WHERE materia='${name}'`);
    if (name.length > 0) {
        return res.status(200).json(pkmn);
    }
        return res.status(404).send({ code: 404, message: "Tarea no encontrada"});

});

module.exports = tareas;