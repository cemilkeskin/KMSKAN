'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const request = require('request');
const cors = require('cors');
const port = 3001;
const fs = require('fs');

const MongoClient = require('mongodb').MongoClient;
const user = encodeURIComponent('MongoDBWeb2034');
const password = encodeURIComponent('67924385');
const url = `mongodb://${user}:${password}@172.20.0.54:27017/?authMechanism=DEFAULT&authSource=${user}`;
// Database Name 
const dbName = 'MongoDBWeb2034';
// Create a new MongoClient   
const client = new MongoClient(url);


//req.body
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

//data transfer from browser to server
app.use(cors());

app.post('/users/createUser', (req, res) => {

    let userName = req.body.user_name;
    let userId = "#" + Math.random().toString(36).substr(2, 4);


    let user = {
        user_name: userName,
        user_id: userId
    }

    console.log(userName);

    client.connect(function (err) {

        const db = client.db(dbName); 
        let collectionUsers = db.collection("alfred_users");

        // collectionUsers.find({user_name: userName}, function (err, resp) {
  
        //     if (resp == "") {
                collectionUsers.insertOne(user, function (err, resp) {
                    console.log(err); 
                    res.send("username inserted");
                });
            // } else {
            //    res.send("username already exists");
            // }
        });
    });



app.listen(port, () => console.log(`Example app listening on port ${port}!`));