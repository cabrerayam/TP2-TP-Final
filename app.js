import express from "express";
import connection from "./connection/connection.js";
import router from "./routes/router.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);


//force:true para volver a crear todas las tablas
//force:false sólo para crear los nuevos modelos
await connection.sync({ force: true }).then(() => {
  app.listen(8080, () => {
    console.log(`app listening on port 8080 http://localhost:8080`);
  });
});