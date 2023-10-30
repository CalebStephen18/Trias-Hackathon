const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const server = express();
const cors = require('cors');

server.use(bodyParser.json());
server.use(cors());




const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "dbtask",
});

db.connect(function (error){
    if (error) {
        console.log("Error");
    } else {
        console.log("Connect");
    }
});

server.listen(8080,function check(error){
    if (error) {
        console.log("Error");
    }
    else {
        console.log("Connected");
    }
});

server.post("/api/task/add",(req,res) => {
    let details= {
        task: req.body.task,
        date:req.body.date,
    };
    let sql = "INSERT INTO tasks SET ?";
    db.query(sql,details,(error) => {
        if (error) {
            res.send({ status:false,message:"Error in creating task"});
        } else {
            res.send({ status:true,message:"Task created successfully"});
        }
    });
});

server.get("/api/task",(req, res) => {
    var sql = "SELECT * FROM tasks";
    db.query(sql,function(error,result) {
        if (error) {
            console.log("Error connecting to DB");
        } else {
            res.send({ status: true, data:result});
        }
    });
});

server.put("/api/task/update/:id", (req, res) => {
    const taskId = req.params.id;
    const { task, date } = req.body;

    const sql = "UPDATE tasks SET task=?, date=? WHERE id=?";
    const values = [task, date, taskId];

    db.query(sql, values, (error, result) => {
        if (error) {
            res.send({ status: false, message: "Task update failed" });
        } else {
            res.send({ status: true, message: "Task update successful" });
        }
    });
});


server.delete("/api/task/delete/:id",(req,res) => {
    let sql = "DELETE FROM tasks WHERE id="+req.params.id + "";
    let query = db.query(sql, (error) => {
        if (error) {
            res.send({ status: false, message:"Task delete failed"});
        } else {
            res.send({status: true, message:"Task delete successful"});
        }
    });
});
