const express = require("express")
const app = express()
const path = require("path")
const morgan = require("morgan")
require("./database");
const routing = require("./routes")

app.use(express.static(path.join(__dirname, 'client-build')))
app.use(morgan("tiny"))

app.use(routing)
app.listen(3000)