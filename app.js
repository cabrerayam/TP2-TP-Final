import express from "express";
import connection from "./connection/connection.js";
import router from "./routes/router.js";
import cookieParser from "cookie-parser";
import { SERVER_PORT } from "./config/config.js";



const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api", router);


//force:true para volver a crear todas las tablas
//force:false sólo para crear los nuevos modelos
await connection.sync({ force: true }).then(() => {
  app.listen(SERVER_PORT, () => {
    console.log(
      `app listening on port ${SERVER_PORT} http://localhost:${SERVER_PORT}`
    );
  });
});