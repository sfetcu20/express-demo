const mongoose = require("mongoose");

const name = "player";
const schema = new mongoose.Schema({
    firstname: {
      type: String,
      required: true,
    },
    lastname:{
        type:String,
        required:true,
    },
    birthday:{
        type:Date,
        require:true,
    },
    age:{
        type:Number,
    },
    CNP:{
        type:String,
        require:true,
    },
    place:{
        name:{
            type:String
        },
        county:{
            type:String
        }
    },
    married:{
        type:Boolean,
        required:true,
    }

  });

  module.exports = mongoose.model(name, schema);