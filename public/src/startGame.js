let player;
let playerId;
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
        console.log(data.id);
        enableIfPlayerOne();
    }
}

getPlayerOnStart().done(setPlayerData)

function enableIfPlayerOne() {
    console.log("Should enable")
    document.querySelector("#roll-button").disabled = false;
}

// player 1 har turen
    // player 1 slutter sin tur på end turn knappen og ændre has turn i database på både playeren og næste player
    // den returnere den spiller som nu har turen og giver det til socket så vi kan sætte enable på den browser som har turen
// Player 2 kan nu trykke på kanppen

document.querySelector("#endturn").addEventListener("click", () => {
    let nextPlayer;
    if(player.id == 1) {
        nextPlayer = 2;
    } else if (player.id == 2) {
        nextPlayer = 3;
    } else if (player.id == 3) {
        nextPlayer = 4;
    } else {
        nextPlayer = 1;
    }
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
    console.log("Its my turn bitch: " + playerId);
    if(player.id === playerId) {
        currentPlayersTurn();
    } else {
        notPlayersTurn();
    }
});

function currentPlayersTurn() {
    document.querySelector("#roll-button").disabled = false;
}

function notPlayersTurn() {
    document.querySelector("#roll-button").disabled = true;
}