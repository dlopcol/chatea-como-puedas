WSocket = {

  ws: undefined,

  initialize: function(onReadyCallback) {
    this.ws = new WebSocket('ws://localhost:8080/');

    // Open connection
    this.ws.onopen =  function() {
      console.log('Connection has been created');
      onReadyCallback();
    };

    //Print messages from server
    this.ws.onmessage = function(message) {
      this.writeMessage(message.data);
    }.bind(this);

    // Log errors from server
    this.ws.onerror = function (error) {
      console.log('WebSocket Error ' + error);
    };
  },

  writeMessage: function(msg){
    $(("#history")).append($('<p></p>').text(msg));
  },

  sendMessage: function(msg) {
    this.ws.send(msg);
  },
}