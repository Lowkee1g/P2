let player = {
    name: "Kappa",
    properties: [
        {
            id: 0,
            name: "Rådhuspladsen",
            rent: 2000,
            sellValue: 2000,
            houseCost: 1000,
            houses: 3,
            owned: true,
        }, {
            id: 1,
            name: "Amagerbro",
            rent: 300,
            SellValue: 1000,
            houseCost: 300,
            houses: 1,
            owned: true,
        }, {
            id: 2,
            name: "Fields",
            rent: 100,
            SellValue: 5000,
            houseCost: 200,
            houses: 5,
            owned: true,
        }
    ]
}

$(document).ready(function(){
    console.log("test");
        $.ajax({
            type: 'get',
            url: '/user/1',
            dataType: 'text',
            success: function (textStatus, status) {
                console.log(textStatus);
                console.log(status);
            },
            error: function(xhr, textStatus, error) {
                console.log(xhr.responseText);
                console.log(xhr.statusText);
                console.log(textStatus);
                console.log(error);
            }
        })
    });



function useIt() {
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
    let propertyID = parseInt(property.id.split("-")[2]);
    console.log(player.properties.find(x => x.id === propertyID));
}

function upgradeProperty(property) {
    console.log(property);
}