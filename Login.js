let countUp = document.getElementById('countUp');
let countDown = document.getElementById('countDown');

var currentPlayers = [];
let x = 0;
let pos = 0;
let playerCount = 0;

// Print player list 
function printPlayerList() {
    playerCount += 1;
    if (playerCount > 4) {
        return;
    }
    let tableRef = document.getElementById("playerTable");
    
    // Insert a row at the end of the table
    let newRow = tableRef.insertRow(-1);

    // Insert a cell in the row at index 0
    let newCell = newRow.insertCell(0);

    // Append a text node to the cell
    let newText = currentPlayers[pos];
    newCell.append(newText);
    pos += 1;
    x += 1;
    if (x > 4) {
        x = 4;
    }
    document.getElementById("playerCount").innerHTML = x+"/4";
}

function goUp() {
    x += 1;
    if (x > 4) {
        x = 4;
    }
    document.getElementById("playerCount").innerHTML = x+"/4";
}

function goDown() {
    x -= 1;
    if (x < 1) {
        x = 1;
    }
    document.getElementById("playerCount").innerHTML = x+"/4";
}

function printName() { 
    let name = document.getElementById('username');
    console.log(name.value);
    currentPlayers.push(name.value);
    console.log(currentPlayers);
    printPlayerList(pos);
    return currentPlayers;
}

