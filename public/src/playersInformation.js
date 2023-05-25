const updateAllPlayers = (playerToUpdate) => {
    socket.emit("playerToUpdate", playerToUpdate);
}

function createPlayersInformation() {
    let playersTemplate =  document.querySelector("#playerInformationTemplate").content;
    let playersContainer = document.querySelector(".playersInformationContainer");

    players.filter(function (playerIsNot) {
        return playerIsNot.id !== playerId
    }).forEach(player => {
        let playersClone = playersTemplate.cloneNode(true);
      
        playersClone.querySelector('.specificPlayerData').id = "SpecificPlayerContainer-" + player.id;
        playersClone.querySelector('.specificPlayerName').textContent = player.name;
        playersClone.querySelector('.specificPlayerMoney').textContent = player.money;
        playersClone.querySelector('.specificPlayerProperties').textContent = player.properties.length;

        playersContainer.appendChild(playersClone);
    });
}

setTimeout(() => {
    createPlayersInformation();
}, 1000);

function updateSpecificPlayerInformation(player) {
    let specificContainer = document.querySelector("#SpecificPlayerContainer-"+player.id);
    specificContainer.querySelector(".specificPlayerMoney").textContent = player.money
    specificContainer.querySelector(".specificPlayerProperties").textContent = player.properties.length
}

socket.on("playerToUpdate", (playerToUpdate) => {
    updateSpecificPlayerInformation(playerToUpdate);
});