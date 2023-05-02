let a = 0;
let p1check = 0;
let random1 = 0;
let random2 = 0;
let jailp1 = 0;
let playerId = 1; //skal ændres til player id fra databasen

//mangler at få lavet end turn funktionen


const startGameBtn = document.getElementById('startGame');
const player1Place = document.getElementsByClassName('player1-place');
//skal udskiftest med tryk på terninger i stedet for knap 

function prisonEscape() {

    for (let i = 0; i < 3; i++) {
        rollDice();
        console.log(playerId + "  " + roll1 + " " + roll2);

        if (roll1 === roll2) {
            jailp1 = 0;
            a = 10;
            return;
        }
    }
};




function throwDice() {
    rollDice();
    a += roll1 + roll2;
    console.log(playerId + " slog " + roll1 + " " + roll2);
    if (roll1 === roll2 && p1check < 3) {
        p1check += 1;
        return;
    } else if (roll1 === roll2 && p1check === 2) {
        moveToJail();
        a = 10;
        jailp1 = 1;
        p1check = 0;
        return;
    } else if (roll1 != roll2) {
        p1check = 0;
        return;
    }
}

//startGameBtn skal ændres til når der trykkes på terningerne
rollButton.addEventListener('click', () => {
    console.log(jailp1);
    if (jailp1 === 1) {
        prisonEscape();
        return;
    }
    if (jailp1 === 0) {
        throwDice();
        if (a % 40 === 30) {
            moveToJail();
            jailp1 = 1;
            return;
        } else {
            movePlayer(a);
            if (a % 40 == 7 || a % 40 == 22 || a % 40 == 36) {
                document.querySelector('.chance-card').style.display = 'block';
                getQuote();
            }
            return;
        }
    }
});

function moveToJail() {
    const player = document.querySelector('.player' + playerId + '-test');
    const field = document.querySelector('#field-10 .player' + playerId + '-placejail');
    field.appendChild(player);
}

function random(number) {
    return Math.floor(Math.random() * number + 1);
}

function movePlayer(playerdicesum) {

    if (playerdicesum % 40 === 10) {
        const player = document.querySelector('.player' + playerId + '-test');
        const field = document.querySelector('#field-' + playerdicesum % 40 + ' .player' + playerId + '-placejail');
        field.appendChild(player);
    } else {
        const player = document.querySelector('.player' + playerId + '-test');
        const field = document.querySelector('#field-' + playerdicesum % 40 + ' .player' + playerId + '-place');
        field.appendChild(player);
    }
}

script(src="/../src/dice.js")
script(src="/../src/chancecard.js")

