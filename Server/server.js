const express = require("express")
const cors = require("cors")
const route = require('./Routers/Router')
const path = require('path');

require("dotenv").config({path:"./Config/.env"})
require("./Config/db")

const app = express()

const port = 5000 

app.use(cors())
app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//Route par défaut
app.use("/api", route);

app.listen(port,()=>{
    console.log(`Server is running on port ${port}.`);
})

