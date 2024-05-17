require('dotenv').config();

const express = require("express");
const colors = require('colors');
const cors = require('cors');
const connectDB = require('./backend/config/db');
const { errorHandler } = require('./backend/middleware/errorMiddleware');

connectDB();

const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('frontend'));
app.use(cors())

app.use(`/api/albums`, require(`./backend/routes/albumsRoutes`));
app.use('/api/usuarios', require('./backend/routes/usuariosRoutes'));
app.use(`/api/albums/:albumId/comentarios`, require('./backend/routes/comentariosRoutes'));

app.use(errorHandler);

app.listen(port, () => console.log(`Servidor iniciado en el puerto ${port}`.cyan.underline));