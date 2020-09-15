const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const app = express();

mongoose.connect('mongodb+srv://radardev:radardev@cluster0.cyuz9.mongodb.net/maratoners?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(express.json());

app.use(routes);

app.listen(3333);

//Metodos HTTP: GET, POST, PUT, DELETE

//TIPOS DE PARAMETROS:
//Query Params:
// req.query (filtros, ordenação, paginação)
//Route Params:
// request.params (Identificar um recurso na alteração ou remoção)
//Body:
// request.body (Dados para criação ou alteração de um registro)

//MongoDB (Não relacional)
