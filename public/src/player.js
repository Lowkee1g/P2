function getPlayerProperties(player) {
    document.querySelector('.cards').innerHTML = "";
    // Get the template for a property card and the container where the cards will be added
    let card = document.querySelector('.cardTemplate').content;
    let cardContainer = document.querySelector('.cards');
    // Iterate over each property owned by the player
    player.properties.forEach(property => {
        // Clone the template to create a new card for each property
        let cardClone = card.cloneNode(true);

        // Get the corresponding field on the game board based on the property's name
        let field = [...document.querySelectorAll('.container .name')]
                      .find(nameElement => nameElement.textContent === property.name)
                      .parentElement.parentElement;

        // Get the color bar element of the field and compute its background color
        let colorBar = field.querySelector('.color-bar');
        if(colorBar !== null) {
            let color = window.getComputedStyle(colorBar).backgroundColor;
            cardClone.querySelector('.color-bar').style.backgroundColor = color;
        }

        // Set the name, rent, and price values on the card
        cardClone.querySelector('.name').textContent = property.name;
        cardClone.querySelector('.cardRent').textContent = "Price " + property.price + "kr";
        cardClone.querySelector('.price').textContent = "Rent " + property.rent + "kr";

        // Set the color of the color bar on the card

        // Add a click event listener to the card to show a popup when clicked
        cardClone.querySelector('.card').addEventListener("click", () => {
            showPopup(field, true);
        });

        // Add the cloned card to the container
        cardContainer.appendChild(cardClone);
    });
}


function getPlayerInfo(player) {
    console.log(player);
    let playerInfo = document.querySelector('.playerdata')
    playerInfo.querySelector('.money').textContent = "Money: " + player.money + "kr"
    playerInfo.querySelector('.propertiesOwned').textContent = "Properties owned: " + player.properties.length
    playerInfo.querySelector('.userName').textContent = player.name
}

// function updatePlayerInfo(player) {
//     let playerInfo = document.querySelector('.playerdata')
//     playerInfo.querySelector('.propertiesOwned').textContent = "Properties owned: " + player.properties.length
//     playerInfo.querySelector('.money').textContent = "Money: " + player.money + "kr"
// }

