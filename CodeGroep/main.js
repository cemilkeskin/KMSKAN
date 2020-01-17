const MongoClient = require('mongodb').MongoClient;
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const app = express();
const port = 3000;
//const mongoose = require("mongoose");
const assert = require('assert');

app.use(cors());

const user = "MongoDBWeb2051";
const password = 94615278;
const dbName = 'MongoDBWeb2051';
const url = `mongodb://${user}:${password}@172.20.0.54:27017/?authMechanism=DEFAULT&authSource=${user}`;
const client = new MongoClient(url);
let db;
let ObjectId = require('mongodb').ObjectID;


app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
app.post('/createUser', function (req, res, next) {
    console.log(req.body);

    let data = req.body;
    client.connect(function (err, db) {

        if (err) throw err;
        db = client.db(dbName);

        db.collection('users').insertOne(data, function (err, resp) {
            res.send("Group created");
            console.log('Item inserted');
        });

    }); 
});

app.post('/getCreatedUser', function (req, res, next) {
    
    let resultArray = [];
    let userName = req.body.userName;
    client.connect(function (err, db) {

        if (err) throw err;
        db = client.db(dbName);
       

    let cursor = db.collection('users').find({
        userName : userName
    });
    
        cursor.forEach(function (doc, err) {
            resultArray.push(doc);

        }, function () {

            res.send(resultArray);

        });
    });
});


app.post('/createGroup', function (req, res, next) {
    console.log(req.body);

    let data = req.body;
    client.connect(function (err, db) {

        if (err) throw err;
        db = client.db(dbName);

        db.collection('group').insertOne(data, function (err, resp) {
            res.send("Group created");
            console.log('Item inserted');
        });

    }); 
});
app.get('/showGroup', (req, res) => {

    client.connect(function (err) {
  
      if (err) throw err;
      const db = client.db(dbName);
      let collectionTeams = db.collection("groups");
      collectionTeams.find({}).toArray(function (err, resp) {
        res.send(resp);
  
      })
    })
  });

app.listen(port,function(){
    console.log("server turning on port "+ port)
});