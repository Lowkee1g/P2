let player = {
    name: "Kappa",
    properties: [
        {
            name: "Rådhuspladsen",
            rent: 1000,
            sellValue: 2000,
        }, {
            name: "Amagerbro",
            rent: 100,
            SellValue: 1000,
        }
    ]
}


function useIt() {
    var content = document.querySelector('template').content;

    var targetContainer = document.querySelector('.player-info');

    player.properties.forEach(property => {
        
        content.querySelector('.propetry-name').textContent = property.name;
        targetContainer.appendChild(document.importNode(content, true));
    });

}