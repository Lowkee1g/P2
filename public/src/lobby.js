// Open socket connection
const socket = io("http://localhost:8080");

// Connect user socket server called "connection" - CUSTOM NAME
socket.on("connection");

// on submit run addPlayerToGame function
document.querySelector('#submit').addEventListener('click', addPlayerToGame)
document.querySelector('#start').addEventListener('click', startGame)
let currentPlayer;
// On submitting add user to session
function addPlayerToGame() {
    // Get username from input field
    let username = document.querySelector('#username').value;

    $.ajax({
        type: 'post',
        url: '/joinPlayer',
        contentType: 'application/json',
        processData: false,
        data: JSON.stringify({data: username}),
        dataType: 'json',
        success: function (playerData) {
            console.log(playerData)
            // Emit data to server via playerjoin - Send data
            socket.emit("playerJoin", playerData.name)
            currentPlayer = playerData;
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
});

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
    console.log("CurrentPLayer is : " + currentPlayer['id'])
    $.ajax({
        type: 'get',
        url: '/startGame',
        data: JSON.stringify({data: currentPlayer }),
        success: function (data) {

            // Emit data to server via startGame - Send data
            socket.emit("startGame")
        },
        error: function(xhr, textStatus, error) {
            console.log('Error');
        }
    })
}

// If stratGame recieve click redirect all users to board
socket.on("startGame", () => {
    window.location = "http://localhost:3000/";
});