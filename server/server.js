const express = require('express');
var app = express();
var JsonDB = require('node-json-db');
const request = require('request');
var db = new JsonDB('./flux-info', true, false);


app.get('/', (req, res) => {
    res.send('Hello Welcome!')
    request.get('http://localhost:9002');
})
app.post('/', (req, res) => {
    "lors de l'évenement POST on peu récuperer les data"
    console.log(db.getData("/")) 
})
module.exports = app;