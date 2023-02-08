//jshint esversion:6
//general initialisations
const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");

//app.use area
app.use(cors());
app.use(express.json());

//mongoose connections
mongoose.connect("mongodb://localhost:27017/todoDB");
const todoSchema = {name: String};
const todo_model = mongoose.model("task",todoSchema);

var stuff = [];
var items = [];

//TASK ADDING AND VIEWING
app.get("/task", (req, res) => {
    todo_model.find(function(err,tasks){
        if(err){
            console.log(err);
        }
        else{
            console.log(tasks);
            res.json(tasks);
        }
    })
    
  });

app.post("/task", (req,res) => {
    let reactData = req.body.task;
    //pushing to array
    stuff.push(reactData);
    //saving to database
    const newTask = new todo_model({
        name : reactData
    })
    newTask.save();
    //telling React that we have recieved it 
    res.send("Recieved");
});

//TASK DELETION
app.post("/delete", (req,res) => {
    deleteId = req.body.id;
    todo_model.deleteOne({_id: deleteId})
        .then(function(){
            console.log("Task has been deleted from the database successfully");
        })
    res.send("Recieved deletable ID");
})

app.get("/delete", (req,res) => {
    console.log(items);
    res.send(items);
})

//quotes api
const api_url ="https://zenquotes.io/api/random";
var flag = 0;

async function getapi(url)
{
  const response = await fetch(url);
  var data = await response.json();
  quote = ({
    quote: data[0].q});
  flag = 1;
}
app.get("/quote", (req, res) => {
    if(flag==0){
        getapi(api_url);
    }
    res.json(quote);
})



//server to listen
app.listen(3001, function() {
  console.log("Server started on port 3001");
});
