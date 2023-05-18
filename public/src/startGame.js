//open socket connection
const socket = io("http://localhost:7070");
socket.on("connection");

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
        let index = players.findIndex(x => x.name === player.name);
        let playerPiece = document.createElement('div');
        playerPiece.className = "player"+player.id + "-piece player-piece"
        if(index === 0) {
            playerPiece.classList.add('player1-piece')
        }else if (index === 1) {
            playerPiece.classList.add('player2-piece')
        } else if(index === 2) {
            playerPiece.classList.add('player3-piece')
        } else {
            playerPiece.classList.add('player4-piece')
        }
        allFields.forEach(field => {
            let playerPlace = document.createElement('div');
            playerPlace.className = "player" + player.id + "-place";
            if(index === 0) {
                playerPlace.classList.add('player1-place')
            }else if (index === 1) {
                playerPlace.classList.add('player2-place')
            } else if(index === 2) {
                playerPlace.classList.add('player3-place')
            } else {
                playerPlace.classList.add('player4-place')
            }
            field.appendChild(playerPlace);
        });
        document.querySelector("#field-0 .container .player"+player.id+"-place").appendChild(playerPiece);
    });
}

function enableIfPlayerOne() {
    console.log("Should enable")
    document.querySelector("#roll-button").disabled = false;
}

document.querySelector("#endturn").addEventListener("click", () => {
    let nextPlayer;
    let index = players.findIndex(x => x.name === player.name);
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