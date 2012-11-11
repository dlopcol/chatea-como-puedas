// Show form to choose nickname before creating a new connection
// Then open connection and send nickname to the server

var ws = new WebSocket('ws://localhost:8080/');

// Open connection
ws.onopen =  function() {
	console.log('Connection has been created');
};

//Print messages from server
ws.onmessage = function(message) {
	writeMessage(message);
};

// Aux function to write a message in DOM
var writeMessage = function (message) {
	var p = $('<p></p>').text(message.data);
	$(document.getElementById("history")).append(p);
};

// Log errors from server
ws.onerror = function (error) {
  console.log('WebSocket Error ' + error);
};

// When submitting the form, send the message to the server
$(document).ready(function() {
	/* attach a submit handler to the form */
	$("#msgForm").submit(function(event) {
		/* stop form from submitting normally */
		event.preventDefault(); 

		/* get some values from elements on the page: */
		var input = $(this).find('input[name="msg"]');
		var msg = input.val();

		/* Send the message */
		ws.send(msg);

		// I cannot call writeMessage(term);
		var p = $('<p></p>').text(msg);
		$(document.getElementById("history")).append(p);

		// Clear input field
		input.val('');
	
	});
});
