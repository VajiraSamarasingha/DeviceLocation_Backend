const mongoose = require('mongoose')

const DeviceSchema = new mongoose.Schema({
    serialnumber:{
        type:String,
        default:"",
    },
    type:{
        type:String,
        default:"",
    },
    image:{
        type:String,
        default:"",
    },
    status:{
        type:String,
        default:"",
    },
})

const DeviceModel = mongoose.model('device',DeviceSchema)
module.exports = DeviceModel