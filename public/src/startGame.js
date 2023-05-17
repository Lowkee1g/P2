//open socket connection
const socket = io("http://localhost:7070");
socket.on("connection");

window.addEventListener("DOMContentLoaded", (event) => {
    console.log(document.querySelectorAll('.container'));
});


let player;
let playerId;
let players;
// We use this because we need callback to use the data outside the ajax success function
function getPlayerOnStart() {
    // let username = "Player1";
    let username = document.querySelector("#userID").value;
    return $.ajax({
        type: 'get',
        url: '/userByName/?name='+username,
    });
}



function setPlayerData(data) {
    player = data;
    playerId = data.id;
    if(data.id == 1) {
        currentPlayersTurn()
        // enableIfPlayerOne();
    }
}

getPlayerOnStart().done(setPlayerData)

function apiAllPlayers() {
    return $.ajax({
        type: 'get',
        url: '/getAllPlayers',
    });
}

function getAllPlayers(data) {
    players = data;
    // Get all players to end turn to next player
    console.log(data);
    generatePlayerPosistions(data);
}

apiAllPlayers().done(getAllPlayers);

function generatePlayerPosistions(players) {
    let allFields = document.querySelectorAll('.container');
    players.forEach(player => {
        console.log(player);
        allFields.forEach(field => {
            let playerPlace = document.createElement('div');
            playerPlace.className = "player" + player.id + "-place";
            console.log(field.appendChild(playerPlace));
            field.appendChild(playerPlace);
        });
    });
}

function enableIfPlayerOne() {
    console.log("Should enable")
    document.querySelector("#roll-button").disabled = false;
}

document.querySelector("#endturn").addEventListener("click", () => {
    let nextPlayer;
    let index = players.findIndex(x => x.id === player.id + 1);
    if(index == -1) {
        console.log('test');
        nextPlayer = 1;
    } else {

        nextPlayer = players[index].id;
    }
    console.log("Length of array: " + players.length);
    console.log("Next player is: " + nextPlayer);

    $.ajax({
        type: 'post',
        url: '/endTurn',
        contentType: 'application/json',
        processData: false,
        data: JSON.stringify({data: player, nextPlayer: nextPlayer}),
        dataType: 'json',
        success: function (nextPlayer) {
            //Disbable button for all but nextPlayer
            console.log(nextPlayer.name);
            sendNextTurn(nextPlayer.id);
        },
        error: function(xhr, textStatus, error) {
                console.log(xhr.responseText);
                console.log(xhr.statusText);
                console.log(textStatus);
                console.log(error);
        }
    })
});

// Emit ud så player 2 nu kan trykke på knappen;
const sendNextTurn = (name) => {
    socket.emit("sendTurn", name);
};

socket.on("recieveTurn", (playerId) => {
    if(player.id === playerId) {
        console.log("Its my turn bitch: " + playerId);
        currentPlayersTurn();
    } else {
        console.log(playerId);
        disableDice();
        hideEndButton();
    }
});

function currentPlayersTurn() {
    console.log("I play this game");
    document.querySelector("#roll-button").disabled = false;
    document.querySelector('#dice1').classList.remove('notTurnDice');
    document.querySelector('#dice2').classList.remove('notTurnDice');
    console.log(document.querySelector('#endturn'));
    document.querySelector('#endturn').classList.remove('notPlayersTurn');
}

function hideEndButton() {
    document.querySelector('#endTurn').classList.add('notPlayersTurn');
}

function disableDice() {
    document.querySelector("#roll-button").disabled = true;
    document.querySelector('#dice1').classList.add('notTurnDice');
    document.querySelector('#dice2').classList.add('notTurnDice');
}