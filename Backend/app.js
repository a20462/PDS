const express = require("express")
const path = require("path");
const cors = require("cors")
const bcrypt = require("bcrypt")
const app = express()

app.use(cors())

app.use(express.json())

app.use(express.urlencoded({ extended: false }));

// DB Connection
const conn = require("./db/conn")

conn();

app.listen(2000, function(){
    console.log("Servidor Online!")
})

// Routes
const routes = require("./routes/router")

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

app.use("/api", routes);

