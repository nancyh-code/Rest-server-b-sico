const express = require('express');
const cors = require('cors');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosPath = '/api/usuarios';
    //Middlewares
    this.middleware();

    //Routes of my application
    this.routes();
  }

  middleware() {
    //CORS
    this.app.use(cors());

    //Lectura y parseo el body
    this.app.use(express.json());
    //directorio público
    this.app.use(express.static('public'));
  }

  routes() {
    this.app.use(this.usuariosPath, require('../routes/usuarios'));
  }
  listen() {
    this.app.listen(this.port, () => {
      console.log(`Example app listening on port`, this.port);
    });
  }
}

module.exports = Server;
