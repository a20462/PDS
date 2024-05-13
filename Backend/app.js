const express = require("express")
const cors = require("cors")
const app = express()

app.use(cors())

app.use(express.json())

// DB Connection
const conn = require("./db/conn")

conn();

app.listen(2000, function(){
    console.log("Servidor Online!")
})

// Routes
const routes = require("./routes/router")

app.use("/api", routes);

// a20461 scfautos14