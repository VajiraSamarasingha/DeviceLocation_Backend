const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const LocationModel = require('./models/Location')
const DeviceModel = require('./models/Device')
const multer = require('multer')
const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/locationdevice')

app.get('/seelocationdata',(req,res)=>{
    LocationModel.find({})
    .then(locations => res.json(locations))
    .catch(err => res.json(err))
})

app.get('/seeDevicedata',(req,res)=>{
    DeviceModel.find({})
    .then(devices => res.json(devices))
    .catch(err => res.json(err))
})

app.post('/createLocation',async(req,res)=>{
    console.log(req.body)
    const LocationData = req.body
    const locationModel = new LocationModel({
        Name:LocationData.name,
        Address:LocationData.address,
        Phone:LocationData.phone,
        Device:LocationData.device,
    })
    console.log(locationModel)
    await locationModel.save();
})


const storage = multer.diskStorage({
    destination:function(req,file,cb){
        return cb(null,'./uploads/Images')
    },
    filename:function(req,file,cb){
        return cb(null,`${Date.now()}_${file.originalname}`)
    }
})

const upload = multer({storage})

const handleFileUpload = (req,res, next) =>{
    upload.single('file')(req,res,err =>{
        if(err){
            return res.status(400).send('File NotFound');
        }
        next();
    })
}

let filePath =''

app.post('/imagepost',handleFileUpload,(req,res,next)=>{
    console.log(req.body);
    console.log(req.file);
    filePath =req.file.path;
    next(); 
})



app.post('/createDevice',async(req,res)=>{
    console.log("Filepath me",filePath)
    console.log('Device data ',req.body)
    const DeviceData = req.body
    const deviceModel = new DeviceModel({
        serialnumber:DeviceData.serialNumber,
        type:DeviceData.type,
        image:filePath,
        status:DeviceData.status,
    })
    await deviceModel.save()
})

app.delete('/deleteLocation/:id',(req,res)=>{
    const id = req.params.id;
    LocationModel.findByIdAndDelete({_id:id})
    .then(res => res.json(res))
    .catch(arr => res.json(arr))
})

app.delete('/deleteDevice/:id',(req,res)=>{
    const id = req.params.id;
    DeviceModel.findByIdAndDelete({_id:id})
    .then(res => res.json(res))
    .catch(arr => res.json(arr))
})


app.listen(3001,()=>{
    console.log("Server is Running")
})