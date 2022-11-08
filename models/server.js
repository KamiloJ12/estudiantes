const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../db/config');

class Server {

    constructor() {
        this.app  = express();
        this.port = 8080;
        
        this.paths = {
            materia:    '/api/materia',
            estudiante: '/api/estudiante'
        }
        
        //Conectar a base de datos
        this.conectarDB();

        //Middlewares
        this.middlewares();

        // Rutas
        this.routes();
    }

    async conectarDB() {
        await dbConnection(); 
    }

    middlewares() {
        this.app.use(cors());
        this.app.use( express.json() );

    } 

    routes() {
       this.app.use( this.paths.estudiante, require('../routes/estudiante.routes') );
       this.app.use( this.paths.materia, require('../routes/materia.routes') );
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en el puerto', this.port );
        });
    }
}

module.exports =Server;