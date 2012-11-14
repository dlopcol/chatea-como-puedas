
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

// Initialize
var connections = [];
var names = [];

// Instantiate a new WebSocketServer
var WebSocketServer = require('ws').Server
  , wss = new WebSocketServer({port: 8080});

// Initialize new WebSocket connection
// Store it and define onmessage and onclose
wss.on('connection', function(ws) {
  var nameReceived = false;
  var id = connections.length;
  connections[id] = ws;

  ws.on('message', function(message) {
    if (nameReceived) {
      broadcast(names[id] + ': ' + message, id);
    } else {
      names[id] = message;
      nameReceived = true;
      broadcast('Connected user: ' + names[id], id);
    }
  });

  ws.on('close', function() {
    connections[id] = null;
    broadcast('Disconnected user: ' + names[id], id);
  });
});

// Broadcast message to the OTHER clients
// that still active (!== null)
function broadcast(message, id) {
  var len = connections.length;
  for (var i=0; i < len; i++) {
    if (i !== id && connections[i] !== null) {
      connections[i].send(message);
    }
  }
}
