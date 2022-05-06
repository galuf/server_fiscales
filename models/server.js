const express = require("express");
const cors = require("cors");
const { db } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.paths = {
      lugar: "/api/acusados_lugar",
      denuncias: "/api/denuncias",
      miembros: "/api/miembros",
      funcionarios: "/api/funcionarios",
      entidades: "/api/acusados_entidades",
      convocatoria: "/api/convocatoria",
    };

    //Conectar a la base de datos
    this.conectarDB();

    //Middlewares
    this.middlewares();

    //Rutas
    this.routes();
  }

  async conectarDB() {
    try {
      await db.authenticate();
      console.log("Database online");
    } catch (error) {
      throw new Error(error);
    }
  }

  middlewares() {
    //CORS
    this.app.use(cors());
    //Lectura y parseo del Body
    this.app.use(express.json());
    //Directorio Publico
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.paths.lugar, require("../routes/lugar"));
    this.app.use(this.paths.denuncias, require("../routes/denuncias"));
    this.app.use(this.paths.miembros, require("../routes/miembros"));
    this.app.use(this.paths.funcionarios, require("../routes/funcionarios"));
    this.app.use(this.paths.entidades, require("../routes/entidades"));
    this.app.use(this.paths.convocatoria, require("../routes/convocatoria"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Listening in port ${this.port}`);
    });
  }
}

module.exports = Server;
