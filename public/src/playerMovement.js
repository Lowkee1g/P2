let a = 0;
let p1check = 0;
let random1 = 0;
let random2 = 0;
let jailp1 = 0;
let playerId = 1; //skal ændres til player id fra databasen

//mangler at få lavet end turn funktionen
//skal evt give spilleren muligheden for at have 3 forsøg for at komme ud af fængsel


const startGameBtn = document.getElementById('startGame');
const player1Place = document.getElementsByClassName('player1-place');

function prisonEscape() {

    for (let i = 0; i < 3; i++) {
        random1 = random(6);
        random2 = random(6);
        console.log(playerId + "  " + random1 + " " + random2);

        if (random1 === random2) {
            jailp1 = 0;
            a = 10;
            return;
        }
    }
};




function throwDice() {
    random1 = random(6);
    random2 = random(6);
    a += random1 + random2;
    console.log(playerId + " slog " + random1 + " " + random2);
    if (random1 === random2 && p1check < 3) {
        p1check += 1;
        return;
    } else if (random1 === random2 && p1check === 2) {
        moveToJail();
        a = 10;
        jailp1 = 1;
        p1check = 0;
        return;
    } else if (random1 != random2) {
        p1check = 0;
        return;
    }
}

startGameBtn.addEventListener('click', () => {
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