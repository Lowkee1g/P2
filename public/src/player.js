function getPlayerProperties(player) {
    let card = document.querySelector('.cardTemplate').content
    let cardContainer = document.querySelector('.cards')
    
    player.properties.forEach(property => {
        let cardClone = card.cloneNode(true)
        cardClone.querySelector('.name').textContent = property.name 
        cardClone.querySelector('.cardRent').textContent = "Price " + property.rent + "kr"
        cardClone.querySelector('.price').textContent = "Rent " + property.price + "kr"
        cardClone.querySelector('.card').addEventListener("click", (event) => {
            console.log(event.target);
            showPopup(event.target,property);
        });
        cardContainer.appendChild(cardClone)
    })
}

function getPlayerInfo(player) {
    console.log(player);
    let playerInfo = document.querySelector('.playerdata')
    playerInfo.querySelector('.money').textContent = "Money: " + player.money + "kr"
    playerInfo.querySelector('.propertiesOwned').textContent = "Properties owned: " + player.properties.length
    playerInfo.querySelector('.userName').textContent = player.name
}

function updatePlayerInfo(player) {
    let playerInfo = document.querySelector('.playerdata')
    playerInfo.querySelector('.money').textContent = "Money: " + player.money + "kr"
}

