
const chat = (msg) => {
    socket.emit("message", msg);
};

socket.on("message_send", (msg) => {
    console.log("Send msg: " + msg);
});

socket.on("message_recieve", (msg) => {
    console.log("Res msg: " + msg);
    receiveMessage("Pengu", msg);
});

function sendMessage() {
    //Get input from inputarea
    var input = document.getElementById("inputtxtID").value;

    //Send message to server
    chat(input);

    
    document.getElementById("conversation").innerHTML += "<p class='p_send'>" + input + "</p>";
    document.getElementById("inputtxtID").value = "";
}

function receiveMessage(from, input) {
    let newmessage = document.createElement("p");
    let newdiv = document.createElement("div");
    let newimg = document.createElement("img");

    newdiv.className = "receive_message";
    newmessage.className = "p_receive";
    newimg.className = "chat_img";

    newmessage.innerHTML = input;
    document.getElementById("conversation").appendChild(newdiv);

    newdiv.appendChild(newmessage);
    newdiv.appendChild(newimg);
    
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