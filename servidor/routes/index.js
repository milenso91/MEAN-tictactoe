var router = require('express').Router();
var Sala = require('../models/Sala.js');
var salas = app.get('salas'); // Al ser un objeto, guardamos la referencia.

router.get('/sala', function(req, res) {
    res.json(salas.devuelveSalas());
})

router.get('/sala/:id', function(req, res) {
    var idSala = req.params.id;
    res.json(salas.buscarSalaId(idSala));
})

router.post('/sala', function(req, res) {
    var nombre = req.body.nombre;
    var sala = new Sala(nombre);
    sala = salas.crearSala(sala);
    res.json(sala.id);
})

module.exports = router;