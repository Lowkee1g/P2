//Functions
let currentPlayer;
let userAdded = false;
let playerList = [];


// Open socket connection
const socket = io("http://localhost:7070");

// Connect user socket server called "connection" - CUSTOM NAME
socket.on("connection");

// on submit run addPlayerToGame function
document.querySelector('#submit').addEventListener('click', addPlayerToGame)
document.querySelector('#start').addEventListener('click', startGame)



// On submitting add user to session
function addPlayerToGame() {
    // Get username from input field
    let username = document.querySelector('#username').value;

    $.ajax({
        type: 'post',
        url: '/joinPlayer',
        contentType: 'application/json',
        processData: false,
        data: JSON.stringify({
            data: username
        }),
        dataType: 'json',
        success: function (user) {
            console.log("This is all of the data that has been received "+ user.name)
            // Emit data to server via playerjoin - Send data
            socket.emit("playerJoin", user)
            currentPlayer = user;
            // Call function to change submit button to a start button 
            changeSubmitButtonToStart();
        },
        error: function(xhr, textStatus, error) {
            console.log('Error');
            console.log('xhr ', xhr);
            console.log('text, ', textStatus);
            console.log('Error', error);
        }
    })
}

// If something is emitted to playerJoin on socket.io call this function - Recieve data
socket.on("playerJoin", (player, numberOfPlayers) => {
    console.log("Player joined with this - " + player.name);
    // Call function to add the new user to the player list
    writeAddedUserToPlayerList(player.name);
    // Call enableStartButton function with numberOfPlayers to enable button - numberOfPlayers viable coming from app.js
    enableStartButton(numberOfPlayers);


    // Call function to update number of players in lobby
    updateNumberOfPlayers(numberOfPlayers);
});

/*
socket.on('disconnect', function(player) {
    numberOfPlayers--;

    console.log('Disconnected from server');
});
*/
socket.on("playerDisconnect", (player, numberOfPlayers) => {
    updateNumberOfPlayers(numberOfPlayers);
    removeUserFromPlayerList(player.name);
});


    

// Function that updates the number of players in the lobby
function updateNumberOfPlayers(numberOfPlayers) {
    // get <a> element and set textcontent to number of players
    document.querySelector('.playerCount').textContent = numberOfPlayers + " / 4";
    playerList = document.querySelector('.playerList').querySelectorAll('p');
    

}

// create a p element and set textcontent to player
function writeAddedUserToPlayerList(player) {
    let p = document.createElement('p');
    p.textContent = player;
    // Append the p element to player list
    document.querySelector('.playerList').appendChild(p);
}

// Function that removes a p element from player list if user disconnects
function removeUserFromPlayerList(player) {
    playerList = document.querySelector('.playerList').querySelectorAll('p');
    console.log(playerList)

    // Loop through all p elements in player list
    for (let i = 0; i < playerList.length; i++) {
        // If the p element textcontent is equal to the player that disconnected
        if (playerList[i].textContent == player) {
            // Remove the p element from player list
            playerList[i].remove();
        }
    }
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

//import rent.js
document.querySelector('#Test').addEventListener('click', async () => {
    var playerId = 1;
    var tile = 2;
    console.log('test');

    $.ajax({
        type: 'POST',
        url: '/api/charge-rent',
        data: JSON.stringify({
            player: playerId,
            tile: tile
        }),
        contentType: 'application/json',
        success: function (data) {
            console.log("lobby: " + data);
        },
        error: function(xhr, textStatus, error) {
            console.log(error);
            console.log(xhr);
            console.log(textStatus);
        }
    })


    /*
    await fetch('/api/charge-rent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ player, tile })
    });
    */
});


// If startGame recieve click redirect all users to board
socket.on("startGame", () => {
    window.location = "http://localhost:3000/";
});
