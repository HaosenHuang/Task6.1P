const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const app = express()
app.use(bodyParser.urlencoded({extended:true}));
mongoose.connect("mongodb://localhost:27017/expertDB",{useNewUrlParser: true})

const expertSchema = new mongoose.Schema({
    _id: String,
    password: String,
    address: String,
    number: String
})

const Expert = new mongoose.model("Expert", expertSchema)

app.route('/experts')
.get((req, res)=>{
    Expert.find((err, expertList)=>{
        if(err){
            res.send(err)
        }
        else{
            res.send(expertList)
        }
    })
})
.post((req, res)=>{
    const expert = new Expert({
        _id : req.body._id,
        password : req.body.password,
        address : req.body.address,
        number : req.body.number
    })
    expert.save((err)=>{
        if(err){
            res.send(err)
        }
        else{
            res.send("added successfullu")
        }
    })
})
.delete((req,res)=>{
    Expert.deleteMany((err)=>{
        if(err){
            res.send(err)
        }
        else{
            res.send("deleted all successfully")
        }
    })
})

app.route('/experts/:id')
.get((req, res)=>{
    Expert.findOne({_id: req.params.id}, (err, expert)=>{
        if(expert){
            res.send(expert)
        }
        else{
            res.send("not found")
        }
    })
})
.delete((req, res)=>{
    Expert.deleteOne({_id: req.params.id}, (err)=>{
        if(err){
            res.send(err)
        }
        else{
            res.send("deleted successfully")
        }
    })
})
.put((req, res)=>{
    Expert.updateOne(
        {_id: req.params.id},
        {
            password: req.body.password,
            address: req.body.address,
            number: req.body.number
        },
        (err)=>{
            if(err){
                res.send(err)
            }
            else{
                res.send("updated successfully")
            }
        }
    )
})

app.listen(8080, (req, res)=>{
    console.log("running on port 8080")
})