const express = require("express")
const app = express()
const path = require("path")
const morgan = require("morgan")
require("./database");
const router = require("./routes");
const cookieParser = require("cookie-parser");

app.use(express.static(path.join(__dirname, 'client-build')))
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(morgan("tiny"))
app.use(cookieParser("CookieA196219990470aSignature"))

app.use(router)

app.listen(3000)