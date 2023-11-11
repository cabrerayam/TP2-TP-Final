import express from "express";
import connection from "./connection/connection.js";
import Role from "./Models/Role.js";
import Producto from "./Models/Producto.js";
import Pedido from "./Models/Pedido.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
await connection.sync(Role);
await connection.sync(Producto);
await connection.sync(Pedido);

app.listen(8080, () => {
  console.log(`app listening on port 8080 http://localhost:8080`);
});