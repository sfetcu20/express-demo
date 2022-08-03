const express = require("express");
const app = express();
const fs = require('fs');
var bodyParser = require('body-parser')

const connectToMongo = require("./functions/connect");
connectToMongo();


var bp = bodyParser.json()

const club =require("./models/club")
const player = require("./models/player")

app.get("/", bp,(req, res) => {
  fs.open("db.json","r",(err,data)=>{
    const js = JSON.parse(data);
    console.log(js)
  })
});

app.post("/create", bp,async (req, res) => { 
      const data = req.body;
      console.log(data)
      await club.create(data)
      return res.status(200).json(data)
});   

app.get("/find", async (req, res) => {
  const data = await club.find({},{name:1})
  return res.status(200).json(data)
});
app.post("./get/name",bp,async(req,res)=>{
  const obg = club.findOne({name:""}).lean();
  return res.status(200).json(obj);
})
app.post("./get/:id",bp,async(req,res)=>{
  const {id}=req.params.id;
  const obj = await club.findById(id);
  return res.status(200).json(obj);
})

app.post("/player/create",bp,async (req,res)=>{
  const data = req.body;
  data.place.county = "Bucuresti";
  await player.create(data);
  return res.status(200).json(data);
})
app.get("/player/get",bp,async(req,res)=>{
  const table = await player.find({},{CNP:0});
  return res.status(200).json(table);  
})
app.get("/player/:id",bp,async(req,res)=>{
  const obj=await player.findOne(
  {"place.county" :"Bucuresti"}
  );
  return res.status(200).json(obj);
})
app.put("/player/putyear/:id",bp,async (req,res)=>{
    const obj = await player.findById(req.params.id).lean();
    console.log(req.params.id)
    const playerDate = obj.birthday;
    console.log(playerDate.getYear(),new Date().getYear())
    const age =new Date().getYear() - playerDate.getYear();
    const newObj=await player.findByIdAndUpdate(req.params.id,{age:age});
    return res.status(200).json(newObj);
})
app.delete("/player/removeplayer/:id",bp,async (req,res)=>{
  const obj = await player.findByIdAndDelete(req.params.id);
  return res.status(200).json(obj);
})
app.put("/club/:id",bp,async(req,res)=>{
  const {id} = req.params.id;
  const obj = await club.findByIdAndUpdate(id,{name:"new name"});
  return res.status(200).json(obj)
})
module.exports = app;
