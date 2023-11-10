import express from "express";
import connection from "./connection/connection.js";
import Role from "./Models/Role.js";

const app = express();
await connection.sync(Role);

app.listen(8080, () => {
  console.log(`app listening on port 8080 http://localhost:8080`);
});