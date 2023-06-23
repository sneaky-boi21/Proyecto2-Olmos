const express = require('express');
const jwt = require('jsonwebtoken');
const user = express.Router();
const db = require('../../config/database');

user.post("/signin", async (req, res, next) => {
    const { user_name, user_mail, user_password, user_type} = req.body;

    if(user_name && user_mail && user_password && user_type) {
        let query = "INSERT INTO user(user_name, user_mail, user_password, user_type) ";
        query += ` VALUES ('${user_name}', '${user_mail}', '${user_password}', '${user_type}');`;
    
        const rows = await db.query(query);
        
        if(rows.affectedRows == 1) {
            return res.status(201).json({code: 201, message: "Usuario creado correctamente"});
        }
        return res.status(500).json({code: 500, message: "Ocurrió un error"});
    }
    return res.status(500).json({code: 500, message: "Campos incompletos"});
});

user.post("/login", async (req, res, next) => {
    const { user_mail, user_password} = req.body;
    const query = `SELECT * FROM user WHERE user_mail = '${user_mail}' AND user_password = '${user_password}';`;
    const rows = await db.query(query);

    if(user_mail && user_password) {
        if(rows.length == 1) {
            const token = jwt.sign({
                user_id: rows[0].user_id,
                user_mail: rows[0].user_mail
            }, "debugkey");
            return res.status(200).json({ code: 200, message: token});
        } 
        else {
            return res.status(401).json({ code: 401, message: "Usuario y/o contraseña incorrectos"});
        }
    }
    return res.status(500).json({ code: 500, message: "Campos incompletos"});
});

user.get("/", async (req, res, next) => {
    const query = "SELECT * FROM user";
    const rows = await db.query(query);

    return res.status(200).json({ code: 200, message: rows });
});

user.get('/profile/:user_mail([\\w\\.\\-\\+]+@[\\w\\.\\-]+)', async (req, res, next) => {
    const user_mail = req.params.user_mail;

    try {
        const respuesta = await db.query(
            `SELECT user_type FROM user WHERE user_mail = ?`,[user_mail]);

        if (respuesta.length > 0) {
            const user_type = respuesta[0].user_type;
            return res.status(200).json({ code: 200, message: user_type });
        } else {
            return res.status(404).json({ code: 404, message: 'User not found' });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ code: 500, message: 'Internal server error' });
    }
});

module.exports = user;