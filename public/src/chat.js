

function sendMessage() {
    //Get input from inputarea
    var input = document.getElementById("inputtxtID").value;

    
    document.getElementById("conversation").innerHTML += "<p class='p_send'>" + input + "</p>";
    document.getElementById("inputtxtID").value = "";
}

function receiveMessage(from, input) {
     
    document.getElementById("conversation").innerHTML += "<div class='receive_message'> <p class='p_receive'>" + input + "</p> <img class='chat_img' src='../public/images/"+ from +".png'> </div>";
}



// Execute a function when the user presses a key on the keyboard
document.getElementById("inputtxtID").addEventListener("keypress", function(event) {
  // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        document.getElementById("inputbutton").click();
    }
});