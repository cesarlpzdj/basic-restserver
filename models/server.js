const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../db/config');

class Server {

    constructor() {

        this.app = express();
        this.port = process.env.PORT;
        this.usersRoutePath = '/api/users';
        
        // Connect to Db
        this.connectDb();

        // Middlewares 
        this.middlewares();

        //App routes
        this.routes();
    }

    async connectDb() {
        await dbConnection();
    }

    middlewares() {
        // CORS
        this.app.use(cors());

        // Body parse and read
        this.app.use(express.json() );

        //Public folder
        this.app.use( express.static('public') );
    }

    routes() {
        
        this.app.use(this.usersRoutePath, require('../routes/user'))
    }

    listen() {

        this.app.listen(this.port, () => {
            console.log('Server running at port ', this.port);
        });
    }
}

module.exports = Server;