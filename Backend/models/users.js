var mongoose = require("mongoose");
var { Schema } = mongoose; 

var userSchema = new Schema({
  userID: { type: String, required: true },
  password: { type: String, required: true }
},
{timestamps: true} //guarda a data de criação do registo
);

var User = mongoose.model("User", userSchema)

module.exports = mongoose.model(User, userSchema);