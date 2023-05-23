
const chat = (msg,playerId) => {
    socket.emit("message", msg,playerId);
};

socket.on("message_send", (msg,playerId) => {
    
    receiveMessage(msg,playerId);
});

socket.on("message_recieve", (msg,playerId) => {
    
    receiveMessage(msg,playerId);
});

document.querySelector("#sendMessage").addEventListener("click", () => {
    var input = document.getElementById("inputtxtID").value;
    chat(input,playerId);
})

function receiveMessage(message, player) {
    let newmessage = document.createElement("p");
    let newdiv = document.createElement("div");

    newmessage.classList.add("p_receive");

    newmessage.innerHTML = message;
    document.getElementById("conversation").appendChild(newdiv);

    newdiv.appendChild(newmessage);
}


// Execute a function when the user presses a key on the keyboard
document.getElementById("inputtxtID").addEventListener("keypress", function(event) {
  // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        var input = document.getElementById("inputtxtID").value;
        chat(input,playerId);
    }
});