let currentdicesum = 0;
let p1check = 0;
let random1 = 0;
let random2 = 0;
let jailp1 = 0;

//Properties


//mangler at få lavet end turn funktionen

const startGameBtn = document.getElementById('startGame');
const player1Place = document.getElementsByClassName('player1-place');
//skal udskiftest med tryk på terninger i stedet for knap 

function prisonEscape() {

    for (let i = 0; i < 3; i++) {
        const roll1 = diceRoll();
        const roll2 = diceRoll();
        console.log(playerId + "  " + roll1 + " " + roll2);

        if (roll1 === roll2) {
            jailp1 = 0;
            currentdicesum = 10;
            return;
        }
    }
};



function moveToJail() {
    const player = document.querySelector('.player' + playerId + '-piece');
    const field = document.querySelector('#field-10 .player' + playerId + '-place');
    field.appendChild(player);
}

const movePlayerSocket = (playerId,dicesum) => {
    socket.emit("movePlayer", playerId,dicesum);
};

// Call moveplayer to all players who are connected
socket.on("movePlayer", (playerId,dicesum) => {
    movePlayer(playerId,dicesum)
});


// Moveplayer should be called with socket so we can update on other screens with their player ID
function movePlayer(playerToMove, playerdicesum) {
    
    if (playerdicesum % 40 === 10) {
        const player = document.querySelector('.player' + playerToMove + '-piece');
        const field = document.querySelector('#field-' + playerdicesum % 40 + ' .player' + playerToMove + '-place');
        field.appendChild(player);
    } else {
        const player = document.querySelector('.player' + playerToMove + '-piece');
        const field = document.querySelector('#field-' + playerdicesum % 40 + ' .player' + playerToMove + '-place');
        console.log(field);
        field.appendChild(player);

        const currentFieldIndex = playerdicesum % 40;
        const currentField = document.querySelector('#field-' + currentFieldIndex);

        if(playerToMove === playerId) {
            if ([0 ,10 ,20 ,30 ,2, 4, 7, 17, 22, 33, 36, 38].includes(currentFieldIndex)) { // Check if the current field is a chance field OR is corner field
                popup.style.display = 'none';
            } else if (currentField.classList.contains('property')) { // Check if the current field is a property
                showPopup(currentField, true, "land");
            } else {
                showPopup(currentField, false, "land");
            }
        }

        closePopup.addEventListener('click', () => {
            popup.style.display = 'none';
        });

        // checkOwnershipLand(currentField.querySelector('.name').textContent);
    }
}
