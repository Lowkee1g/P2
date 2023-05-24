
const chat = (msg,player) => {
    socket.emit("message", msg,player);
};

socket.on("message_send", (msg,player) => {
    
    receiveMessage(msg,player);
});

socket.on("message_recieve", (msg,player) => {
    
    receiveMessage(msg,player);
});

document.querySelector("#sendMessage").addEventListener("click", () => {
    var input = document.getElementById("inputtxtID").value;
    chat(input,player);
})



function receiveMessage(message, player) {
    let newmessage = document.createElement("p");
    let sendby = document.createElement("p");
    let newdiv = document.createElement("div");

    newmessage.classList.add("p_receive");
    sendby.classList.add("p_sendby");

    newmessage.innerHTML = message;
    sendby.innerHTML = "- " + player.name;
    document.getElementById("conversation").appendChild(newdiv);

    newdiv.appendChild(newmessage);
    newdiv.appendChild(sendby);
}


// Execute a function when the user presses a key on the keyboard
document.getElementById("inputtxtID").addEventListener("keypress", function(event) {
  // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        var input = document.getElementById("inputtxtID").value;
        chat(input,player);
    }
});