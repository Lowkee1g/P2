// Open socket connection
const socket = io("http://localhost:8080");

// Connect user socket server called "connection" - CUSTOM NAME
socket.on("connection");

// on submit run addUserToSession function
document.querySelector('#submit').addEventListener('click', addUserToSession)

// On submitting add user to session
function addUserToSession() {
    // Get username from input field
    let username = document.querySelector('#username').value;
    console.log(username);
    $.ajax({
        type: 'post',
        url: '/joinPlayer',
        contentType: 'application/json',
        processData: false,
        data: JSON.stringify({data: username}),
        dataType: 'json',
        success: function (sessionData,textStatus, status) {
            console.log('Sucess');
            console.log(textStatus);
            console.log(status);
            // Emit data to playerJoin lobby on socket.io
            socket.emit("playerJoin", sessionData)
        },
        error: function(xhr, textStatus, error) {
            console.log('Error');
            console.log(xhr.responseText);
            console.log(xhr.statusText);
            console.log(textStatus);
            console.log(error);
        }
    })
}

// If something is emitted to playerJoin on socket.io call function writeAddedUserToPlayerList with player data
socket.on("playerJoin", (player) => {
    writeAddedUserToPlayerList(player)
});

// create a p element and set textcontent to player
function writeAddedUserToPlayerList(player) {
    let p = document.createElement('p');
    p.textContent = player;
    // Append the p element to player list
    document.querySelector('.table').appendChild(p);
}