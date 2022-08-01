const express = require("express");
const app = express();
const fs = require('fs');
var bodyParser = require('body-parser')


var bp = bodyParser.json()


app.get("/", bp,(req, res) => {
  fs.open("db.json","r",(err,data)=>{
    const js = JSON.parse(data);
    console.log(js)
  })
});

app.post("/", bp,(req, res) => {
  console.log(req.body);
  const new_data =JSON.parse(JSON.stringify(req.body));

  if (fs.existsSync("db.json")) {
      fs.readFile("db.json","utf-8",(err,data)=>{
                    const old_data = JSON.parse(data);
                    old_data.push(new_data);
                  fs.writeFile("db.json",JSON.stringify(old_data))
              })
    }
    
    else fs.writeFile("db.json",JSON.stringify(file))

  res.status(200).json({message:"ok"})
});

app.get("/:id", (req, res) => {
  // TODO: read player by id
});

module.exports = app;
