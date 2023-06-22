const express = require('express');
const tareas = express.Router();
const db = require('../../config/database');


/*tareas.post("/", async (req, res, next) => {
    const {nombre_tarea, materia, detalles, calificacion, fecha_entrega, id_profesor, id_alumno, retroalimentacion, archivo} = req.body;

    if(nombre_tarea && materia && detalles && calificacion && fecha_entrega && id_profesor && id_alumno && retroalimentacion && archivo) {
        let query = "INSERT INTO tareas(nombre_tarea, materia, detalles, calificacion, fecha_entrega, id_profesor, id_alumno, retroalimentacion, archivo)";
        query += ` VALUES ('${nombre_tarea}', '${materia}', '${detalles}', '${calificacion}', '${fecha_entrega}', '${id_profesor}', 
        '${id_alumno}', '${retroalimentacion}', '${archivo}')`;
    
        const rows = await db.query(query);
        
        if(rows.affectedRows == 1) {
            return res.status(201).json({code: 201, message: "Tarea creada correctamente"});
        }
        return res.status(500).json({code: 500, message: "Ocurrió un error"});
    }
    return res.status(500).json({code: 500, message: "Campos incompletos"});
});*/

tareas.post("/", async (req, res, next) => {
    const {nombre_tarea, materia, detalles, calificacion, fecha_entrega, id_profesor, id_alumno, retroalimentacion, archivo} = req.body;

    // Create arrays to hold the field names and values
    let fields = [];
    let values = [];

    // Add field names and values to the arrays for each field that is present in req.body
    if (nombre_tarea) {
        fields.push('nombre_tarea');
        values.push(`'${nombre_tarea}'`);
    }
    if (materia) {
        fields.push('materia');
        values.push(`'${materia}'`);
    }
    if (detalles) {
        fields.push('detalles');
        values.push(`'${detalles}'`);
    }
    if (calificacion) {
        fields.push('calificacion');
        values.push(`'${calificacion}'`);
    }
    if (fecha_entrega) {
        fields.push('fecha_entrega');
        values.push(`'${fecha_entrega}'`);
    }
    if (id_profesor) {
        fields.push('id_profesor');
        values.push(`'${id_profesor}'`);
    }
    if (id_alumno) {
        fields.push('id_alumno');
        values.push(`'${id_alumno}'`);
    }
    if (retroalimentacion) {
        fields.push('retroalimentacion');
        values.push(`'${retroalimentacion}'`);
    }
    if (archivo) {
        fields.push('archivo');
        values.push(`'${archivo}'`);
    }

    // Check if at least one field is present
    if (fields.length > 0) {
        // Build the INSERT statement using the field names and values arrays
        let query = "INSERT INTO tareas(" + fields.join(', ') + ")";
        query += " VALUES (" + values.join(', ') + ")";

        const rows = await db.query(query);

        if(rows.affectedRows == 1) {
            return res.status(201).json({code: 201, message: "Tarea creada correctamente"});
        }
        return res.status(500).json({code: 500, message: "Ocurrió un error"});
    } else {
        // Handle case where no fields are present
        return res.status(500).json({code: 500, message: "Campos incompletos"});
    }
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

tareas.patch("/:id([0-9]{1,3})", async (req, res, next) => {
   
    if (req.body.calificacion) {
        let query = `UPDATE tareas SET calificacion='${req.body.calificacion}' WHERE id_tarea=${req.params.id};`;
        const rows = await db.query(query);
        
        if(rows.affectedRows == 1) {
            return res.status(200).json({code: 200, message: "Tarea calificada correctamente"});
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