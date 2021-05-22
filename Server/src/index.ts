import { createConnection } from "typeorm";
const express = require("express");
const routes = require("./routes/todo");
createConnection()
  .then(async (connection) => {
    console.log("DB is connected");

    const app = express();
    app.use(express.json());

    app.use("/api/", routes);
    console.log("App is runing");
    app.listen("5000");
  })
  .catch((error) => console.log(error));
