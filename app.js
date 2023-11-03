import express from "express";

const app = express();


app.listen(8080, () => {
  console.log(`app listening on port 8080 http://localhost:8080`);
});