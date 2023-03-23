function getUserInformationUponJoining(playerID) {
    $.ajax({
        type: 'get',
        url: '/user/' + playerID,
        dataType: 'text',
        success: function (information, status) {
            console.log(JSON.parse(information));
            console.log(status);
            showPlayersInformation(JSON.parse(information));
        },
        error: function(xhr, textStatus, error) {
            console.log(xhr.responseText);
            console.log(xhr.statusText);
            console.log(textStatus);
            console.log(error);
        }
    })
}

getUserInformationUponJoining(1);

function showPlayersInformation(player) {
    var content = document.querySelector('template').content;

    var targetContainer = document.querySelector('.player-info');

    player.properties.forEach(property => {
        content.querySelector('.propetry-name').textContent = property.name;
        content.querySelector('.property .container').id = "propertyID-" + property.id;
        targetContainer.appendChild(document.importNode(content, true));
        document.querySelector('#propertyID-' + property.id).addEventListener('click', function () {
            showProperty(property)});
        });
}

function showProperty(property) {
    document.querySelector('.card-name .name').textContent = property.name;
    document.querySelector('.card-buttons .sell').id = "sell-propertyID-" + property.id;

    if(property.owned) {
        document.querySelector('.card-price').style.display = "none";
        document.querySelector('.card-buttons .buy').style.display = "none";
    } else {
        document.querySelector('.card-price .price').textContent = property.price;
    }
    
    if(property.houses == 5) {
        document.querySelector('.card-houses .houses').textContent = "Hotel";
        document.querySelector('.card-buttons .upgrade').disabled = true;
    } else {
        document.querySelector('.card-houses .houses').textContent = property.houses;
        document.querySelector('.card-buttons .upgrade').disabled = false;
    }
   
    document.querySelector('.card-rent .rent').textContent = property.rent + " kr";
    document.querySelector('.card-house-cost .house-cost').textContent = property.houseCost + " kr";
    document.querySelector('.card-sell-price .sell-price').textContent = property.name;
    document.querySelector('.card-container').classList.remove('hide-card-container');
}

function sellProperty(property) {
    // let propertyID = parseInt(property.id.split("-")[2]);
    // console.log(player.properties.find(x => x.id === propertyID));
}

function upgradeProperty(property) {
    // console.log(property);
}