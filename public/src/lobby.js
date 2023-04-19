//Functions
let currentPlayer;



// Open socket connection
const socket = io("http://localhost:8080");

// Connect user socket server called "connection" - CUSTOM NAME
socket.on("connection");

// on submit run addUserToSession function
document.querySelector('#submit').addEventListener('click', addUserToSession)
document.querySelector('#start').addEventListener('click', startGame)



// On submitting add user to session
function addUserToSession() {
    // Get username from input field
    let username = document.querySelector('#username').value;

    $.ajax({
        type: 'post',
        url: '/joinPlayer',
        contentType: 'application/json',
        processData: false,
        data: JSON.stringify({data: username}),
        dataType: 'json',
        success: function (sessionData) {

            // Emit data to server via playerjoin - Send data
            socket.emit("playerJoin", sessionData)
            currentPlayer = sessionData;
            // Call function to change submit button to a start button 
            changeSubmitButtonToStart();
        },
        error: function(xhr, textStatus, error) {
            console.log('Error');
        }
    })
}

// If something is emitted to playerJoin on socket.io call this function - Recieve data
socket.on("playerJoin", (player, numberOfPlayers) => {
    // Call function to add the new user to the player list
    writeAddedUserToPlayerList(player);
    // Call enableStartButton function with numberOfPlayers to enable button - numberOfPlayers viable coming from app.js
    enableStartButton(numberOfPlayers);


    // Call function to update number of players in lobby
    updateNumberOfPlayers(numberOfPlayers);
});

socket.on('disconnect', function() {
    numberOfPlayers--;
    console.log('Disconnected from server');
});

// Function that updates the number of players in the lobby
function updateNumberOfPlayers(numberOfPlayers) {
    // get <a> element and set textcontent to number of players
    document.querySelector('.playerCount').textContent = numberOfPlayers + " / 4";

}

// create a p element and set textcontent to player
function writeAddedUserToPlayerList(player) {
    let p = document.createElement('p');
    p.textContent = player;
    // Append the p element to player list
    document.querySelector('.playerList').appendChild(p);
}

// Function that hide submit button and show start button
function changeSubmitButtonToStart() {
    document.querySelector('#submit').style.display = "none";
    document.querySelector('#start').style.display = "block";
}

// If number of players are greater than 2 enable start button
function enableStartButton(numberOfPlayers) {
    if(numberOfPlayers >= 2) {
        document.querySelector('#start').disabled = false;
    }
}

// Function startGame - On start game button click call ajax route that gives a success respond
function startGame() {
    console.log("CurrentPLayer is : " + currentPlayer)
    $.ajax({
        type: 'get',
        url: '/startGame',
        success: function () {
            console.log('startGame');

            // Emit data to server via startGame - Send data
            socket.emit("startGame")
        },
        error: function(xhr, textStatus, error) {
            console.log('Error');
        }
    })
}

// If startGame recieve click redirect all users to board
socket.on("startGame", () => {
    window.location = "http://localhost:3000/";
});