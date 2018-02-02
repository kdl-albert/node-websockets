'use strict';

const express = require('express');
const SocketServer = require('ws').Server;
const path = require('path');

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');

const server = express();
server.get('/', function (req, res) {
	res.sendfile(INDEX);
});

server.get("/api/", function(req, res) {
	wss.clients.forEach((client) => {
	res.send('<b>Hello</b> welcome to my http server made with express');
  });
 });

  server.listen(PORT, () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.on('close', () => console.log('Client disconnected'));
});
