var express = require('express');
app = express(); // Global (para poder usarlo en otros archivos en "routes").
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');
var fs = require('fs'); // Trabajar con archivos
var path = require('path'); // Minilibreria para mezclas las ruta
var ListaSalas = require('./models/ListaSalas');

// serve static files from /public.
// Debido a que esta puesto antes de las rutas tiene preferencia.
var staticRoot = __dirname + '/public/';
app.use(express.static(staticRoot));

// bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Variable global de la aplicación.
var listaSalas = new ListaSalas();
app.set('salas', listaSalas);

// Es como si cargara ./routes/index.js es el fichero de las rutas.
var routes = require('./routes')
// Aplica las rutas apartir del path /api 
app.use('/api', routes);

require("./socket.js")(io);

// Si no encuentra la ruta puesta en la URL utiliza esto:
app.use(function (req, res, next) {
    // Si la ruta no es HTML
    var accept = req.accepts('html', 'json', 'xml');
    if (accept !== 'html') {
        return next();
    }

    // Si la ruta tiene un punto asume que es un fichero
    var ext = path.extname(req.path);
    if (ext !== '') {
        return next();
    }
    // Si es HTML y no es fichero, te devuelve el index html
    fs.createReadStream(staticRoot + 'index.html').pipe(res); // pipe(res) envia el stream (de index.html) al cliente
});

// El servidor escuche en el puerto 3000
http.listen(3000, function () {
    console.log('Escuchando en *:3000');
});