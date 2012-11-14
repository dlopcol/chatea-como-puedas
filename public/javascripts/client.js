// Show form to choose nickname before creating a new connection
// Then open connection and send nickname to the server
StartChat = {
  checkNameAndCreateConnection: function(name) {
    // Check that name is correct and not empty
    if (name === "") {
      alert("You must type your nickname");
    } else {
      // Create the websocket connection
      WSocket.initialize(function(){
        // Send the name over the websocket
        WSocket.sendMessage(name);      
      });

      $("#welcome").hide();
      $("#messages").show();
    }

  }
};

$(document).ready(function() {
  $("#messages").hide();

  /* Attach a submit handler to the form
  to send message to the server */
  $("#msgForm").submit(function(event) {
    // Stop form from submitting normally
    event.preventDefault(); 

    /* get some values from elements on the page: */
    var input = $(this).find('input[name="msg"]');
    var msg = input.val();

    // Send the message
    WSocket.sendMessage(msg);

    // Print message in DOM
    WSocket.writeMessage(msg);

    // Clear input field
    input.val('');
  
  });
});