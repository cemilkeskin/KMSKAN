'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const request = require('request');
const cors = require('cors');
const port = 3001; 
const fs = require('fs');

app.use(bodyParser.urlencoded({   
    extended: false
})); 

app.use(bodyParser.json());

app.use(cors());   

app.get('/api/getPaintings', (req, res) => {   
    let query = req.query.name;
    console.log(req.query);
    console.log(query);
    let file = JSON.parse(fs.readFileSync('paintings.json', 'utf8'));  
    let found = file.find((element) => {
        return element.paintingTag == query;
    });
    console.log(found);   
    res.send(found);
     
}); 

// app.get('/api/getPainting', (req, res) => {  

 
//     let file = JSON.parse(fs.readFileSync('paintings.json', 'utf8')); 

//     console.log(file);
//     res.send(file);
     
// }); 
 
app.get('/api/getName', (req, res) => {   
    let query = req.query.name;
    console.log(req.query);
    console.log(query);
    let alldata = [];
    let data = { 
        user_name: query  
    } 
   let readfile =  JSON.parse(fs.readFileSync('name.json', 'utf8'));
alldata = readfile;
alldata.push(data);
    let file = fs.writeFile('name.json', JSON.stringify(alldata), (err) => {
        if (err) throw err;
        console.log('The "data to append" was appended to file!');
      });
    
    console.log(file);  
    res.send(file);
});   

app.listen(port, () => console.log(`Example app listening on port ${port}!`)); 