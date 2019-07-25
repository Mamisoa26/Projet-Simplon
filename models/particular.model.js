const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const ParticularSchema = new Schema({
  _id: {
    type: Number,
    required: true
  },
  nom: {
    type: String,
    required: true
  },
  prenom: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: false
  }
  
},
{
    timestamps: true
});
module.exports = Particular = mongoose.model("particuliers", ParticularSchema);