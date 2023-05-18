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
function apiAllPlayers() {
    let arrayOfPlayersToGet = [];
    const getPlayers = document.querySelectorAll(".playerNameHidden");
    let url = "";
    getPlayers.forEach(player => {
        arrayOfPlayersToGet.push(player.value);
        url += player.value+";"
    })
    console.log(url);
    return $.ajax({
        type: 'get',
        url: '/getAllPlayers/?names='+url,
        data: arrayOfPlayersToGet,
        traditional: true,
    });
}

function getAllPlayers(data) {
    players = data;
    // Get all players to end turn to next player

    generatePlayerPosistions(data);
}

apiAllPlayers().done(getAllPlayers);

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
    if(players[0]['id'] === playerId) {
        currentPlayersTurn()
        // enableIfPlayerOne();
    }
}

getPlayerOnStart().done(setPlayerData)


function generatePlayerPosistions(players) {
    let allFields = document.querySelectorAll('.container');
    players.forEach(player => {
        allFields.forEach(field => {
            let playerPlace = document.createElement('div');
            playerPlace.className = "player" + player.id + "-place";
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
    console.log(players);
    console.log(player);
    let index = players.findIndex(x => x.name === player.name);
    console.log(index);
    if(index + 1 === players.length) {
        nextPlayer = players[0].id;
    } else {
        nextPlayer = players[index + 1].id;
    }
    sendNextTurn(parseInt(nextPlayer));
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