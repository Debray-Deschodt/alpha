const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = schema({
  name : { type: String , required : true},
  gameNumber : {type: Number , default: 0},
}) 
 
const Users = mongoose.model("users", userSchema);

module.exports(Users)
