const express = require("express")
const router = express.Router()
const postIt = require('./postIt')

router.use("/postit", postIt)

router.use("/", (req,res)=>{
    console.log("welcome on the index")
    res.end()
})

module.exports = router