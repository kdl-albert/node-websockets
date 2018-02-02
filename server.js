'use strict';

const express = require('express');
const SocketServer = require('ws').Server;
const path = require('path');

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');

var app = express();

app.get('/', function (req, res) {
    res.send('<b>My</b> first express http server');
});

// 1) Add a route that answers to all request types
app.route('/article')
.get(function(req, res) {
    res.send('Get the article');
})
.post(function(req, res) {
    res.send('Add an article');
})
.put(function(req, res) {
    res.send('Update the article');
});

// 2) Use a wildcard for a route
// answers to : theANYman, thebatman, thesuperman
app.get('/the*man', function(req, res) {
    res.send('the*man');
});

// Skype Request
let resKey = null;


app.get("/api/messages/", function(req, res) {
	    
	const cb = (ret) => {
        resKey = res;
    };
	
	wss.clients.forEach((client) => {
    //client.send(new Date().toTimeString()+'OK',cb);
	client.send(req,cb);
	
    });
});

app.use(function(req, res, next) {
    res.status(404).send("Sorry, that route doesn't exist. Have a nice day :)");
});

const server = app.listen(PORT, function () {
    console.log('Example app listening on port 3000.');
});

const wss = new SocketServer({ server });
wss.on('connection', (ws) => {
  console.log('Client connected');
  //console.log(ws);
  
  ws.on('close', () => console.log('Client disconnected'));
  ws.on('message', (data) => {
  console.log(data);
  //resKey.send(data);
});
});
