const express = require('express');
const cors = require('cors')

const dbConnection = require("../database/config");

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.userPath = "/api/users"
        this.authPath = "/api/auth"
        // Database
        this.connectDatabase();
        // Middlewares
        this.middlewares();
        // Routes
        this.routes();
    }

    middlewares() {
        // CORS
        this.app.use(cors())
        // Lectura y parseo
        this.app.use(express.json());
        // Directorio público
        this.app.use(express.static('public'));
    }

    routes() {

        this.app.use(this.userPath, require('../routes/user.routes'));
        this.app.use(this.authPath, require('../routes/auth.routes'));

        // 404
        this.app.get('*', (req, res) => {
            res.sendFile(process.cwd() + '/public/404.html');
        })
    }

    async connectDatabase() {
        await dbConnection();
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Running at http://localhost:${this.port}`)
        })
    }
}

module.exports = Server;