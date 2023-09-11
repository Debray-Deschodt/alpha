const express = require("express")
const app = express()
const path = require("path")
const morgan = require("morgan")
require("./database");
const router = require("./routes")

app.use(express.static(path.join(__dirname, 'client-build')))
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(morgan("tiny"))

app.use(router)

app.listen(3000)