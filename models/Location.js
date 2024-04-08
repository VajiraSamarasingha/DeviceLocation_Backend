const mongoose = require('mongoose')

const LocationSchema = new mongoose.Schema({
    Name: {
        type:String,
        default:"",
    },
    Address:{
        type:String,
        default:"",
    },
    Phone:{
        type:String,
        default:"",
    },
    Device:{
        type:String,
        default:"",
    },
})

module.exports = mongoose.model('locations',LocationSchema);