//Dependencies
const morgan = require('morgan');
const express = require('express');
const app = express();
//Routers
const sistemaEntregas = require('./backend/routes/sistemaEntregas');
const sistemaTareas = require('./backend/routes/sistemaTareas');
//const generar = require('./backend/routes/generar');
const user = require('./backend/routes/user');
//Middleware
//const auth = require('./backend/middleware/auth');
const notFound = require('./backend/middleware/notFound');
const index = require('./backend/middleware/index');
const cors = require('./backend/middleware/cors');

app.use(cors);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", index);


app.use("/user", user);
//app.use(auth);


app.use("/sistemaEntregas", sistemaEntregas);
app.use("/sistemaTareas", sistemaTareas);
//app.use("/generar", generar);
app.use(notFound);

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running...")
});