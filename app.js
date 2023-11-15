import express from "express";
import connection from "./connection/connection.js";
import router from "./routes/router.js";
import cookieParser from "cookie-parser";


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api", router);


//force:true para volver a crear todas las tablas
//force:false sólo para crear los nuevos modelos
await connection.sync({ force: false }).then(() => {
  app.listen(8080, () => {
    console.log(`app listening on port 8080 http://localhost:8080`);
  });
});