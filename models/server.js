const express = require('express');
const cors = require('cors')

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.userPath = "/api/users"

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

        // 404
        this.app.get('*', (req, res) => {
            res.sendFile(process.cwd() + '/public/404.html');
        })
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Running at http://localhost:${this.port}`)
        })
    }
}

module.exports = Server;