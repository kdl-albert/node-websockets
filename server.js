'use strict';

const express = require('express');
const SocketServer = require('ws').Server;
const path = require('path');

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');

const server = express()
  .use((req, res) => res.sendFile(INDEX) )
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.on('close', () => console.log('Client disconnected'));
});
wss.on('message', function incoming(data) {
  console.log(`Roundtrip time: ${Date.now() - data} ms`);

  setTimeout(function timeout() {
    wss.send(`Roundtrip time: ${Date.now() - data} ms` + Date.now()+" OK "+ PORT);
  }, 500);
});

server.get('/', function (req, res) {
	res.sendfile(__dirname + '/index.html');
});

server.get("/api/", function(req, res) {
	wss.clients.forEach((client) => {
	res.send('<b>Hello</b> welcome to my http server made with express');
  });
 });

