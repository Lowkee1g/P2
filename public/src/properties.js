const fields = document.querySelectorAll('.property');
const popup = document.querySelector('.popup');
const closePopup = document.querySelector('.closePopup');
const popupTitle = document.querySelector('.popup-title');
const popupHeader = document.querySelector('.popup-header');
const popupDescription = document.querySelector('.popup-description');
const popupRailroadDescription = document.querySelector('.popup-railroad-description');
const railroads = document.querySelectorAll('.railroad');

let fieldId;

  async function showPopup(field, isProperty, clickOrLand) {
     
    const data = await runAjax(field.querySelector('.container .name').textContent);
    const name = data.name;
    const price = data.price; 

    if(data.owned && data.userId !== playerId) {
        payRent(playerId,data);
    }

    // set hidden property id to id on specific property
    fieldId = document.querySelector("#propertyIdHidden").value = data.id;
    console.log(data);
  
  // Update the popup with the item details
  popupTitle.textContent = name;
  popupDescription.querySelector('.price').textContent = 'Price: ' + price;

  // Check if the item is a property
  if (isProperty) {
      // Get the color of the color bar
      const colorBar = field.querySelector('.color-bar');
      const color = window.getComputedStyle(colorBar).backgroundColor;

      // Hide the railroad description
      popupRailroadDescription.style.display = 'none';
      popupDescription.style.display = 'block';

      // Update the popup header color
      popupHeader.style.backgroundColor = color;

      // Calculate and update the house prices based on the property price. If the property is a railroad, hide the description
      document.querySelector('.one-house').textContent = 'ONE: ' + parseInt(price) * 0.2 + ' DKK';
      document.querySelector('.two-house').textContent = 'TWO: ' + parseInt(price) * 0.4 + ' DKK';
      document.querySelector('.three-house').textContent = 'THREE: ' + parseInt(price) * 0.6 + ' DKK';
      document.querySelector('.four-house').textContent = 'FOUR: ' + parseInt(price) * 0.8 + ' DKK';

      document.querySelector('.rent').textContent = 'Rent: ' + data.rent + ' DKK';
      document.querySelector('.houses').textContent = 'Houses: ' + data.houses;
    
  } else {
      // If the item is a railroad, set the popup header color to white
      popupRailroadDescription.style.display = 'block';
      popupHeader.style.backgroundColor = 'white';
      popupDescription.style.display = 'none';
      rentPrice = parseInt(price) * 0.3;
      document.querySelector('.railroad-rent').textContent =  rentPrice + ' DKK';
      popupRailroadDescription.querySelector('.price').textContent = 'Price: ' + price;
  }


  // Display the popup
  popup.style.display = 'block';

  // Check ownership and update button states
  checkOwnership(data,clickOrLand);
}

function runAjax(fieldName) {
    return new Promise(function(resolve, reject) {
      $.ajax({
        type: 'GET',
        url: "/getSpecificProperty/?fieldName="+fieldName,
        success: function(data) {
          resolve(data);
        },
        error: function(xhr, textStatus, error) {
          console.log(error);
          console.log(xhr);
          console.log(textStatus);
          reject(error);
        }
      });
    });
  }

function checkOwnership(data,clickOrLand) {
    if(data.owned && data.userId === playerId) {
        buyButton.style.display = "none";
        sellButton.style.display = "block";
        upgradeButton.style.display = "block";
    } else if(data.owned && data.userId !== playerId) {
        sellButton.style.display = "none";
        upgradeButton.style.display = "none";
        buyButton.style.display = "none";
    } else if(clickOrLand === "click" && data.userId === playerId) {
        sellButton.style.display = "block";
        upgradeButton.style.display = "block"
        buyButton.style.display = "none";
    } else if(clickOrLand === "click" && data.userId !== playerId) {
        sellButton.style.display = "none";
        upgradeButton.style.display = "none"
        buyButton.style.display = "none";
    } 
    else {
        sellButton.style.display = "none";
        upgradeButton.style.display = "none";
        buyButton.style.display = "block";
    }
}

function setupGame() {
  fields.forEach(field => {
      field.addEventListener('click', () => {
          if (field.classList.contains('property')) {
              showPopup(field, true, "click");
          }
      });
  });

  railroads.forEach(field => {
      field.addEventListener('click', () => {
          if (field.classList.contains('railroad')) {
              showPopup(field, false, "click");
          }
      });
  });

  closePopup.addEventListener('click', () => {
      popup.style.display = 'none';
  });
}


const buyButton = document.querySelector('.buy-button');
buyButton.addEventListener('click', () => {

    $.ajax({
        type: 'POST',
        url: '/userBuyProperty',
        contentType: 'application/json',
        processData: false,
        data: JSON.stringify({propertyID: fieldId, user: player}),
        dataType: 'json',
        success: function (data) {
            checkOwnership(data.property);
            getPlayerProperties(data.user)
            getPlayerInfo(data.user)
            showAlert(data.message,data.property)
        },
        error: function(xhr, textStatus, error) {
            console.log('Error');
            console.log('xhr ', xhr);
            console.log('text, ', textStatus);
            console.log('Error', error);
        }
    });
});

const upgradeButton = document.querySelector('.upgrade-button');
upgradeButton.addEventListener('click', () => {
    $.ajax({
        type: 'POST',
        url: '/UpOrDownGrade',
        contentType: 'application/json',
        processData: false,
        data: JSON.stringify({propertyID: fieldId, user: player, changeAmount: 2}),
        dataType: 'json',
        success: function (data) {
            getPlayerInfo(data.user)
            showAlert(data.message,data.property)
        },
        error: function(xhr, textStatus, error) {
            console.log('Error');
            console.log('xhr ', xhr);
            console.log('text, ', textStatus);
            console.log('Error', error);
        }
    })
});

const sellButton = document.querySelector('.sell-button');
sellButton.addEventListener('click', () => {
    $.ajax({
        type: 'POST',
        url: '/userSellProperty',
        contentType: 'application/json',
        processData: false,
        data: JSON.stringify({propertyID: fieldId, user: player}),
        dataType: 'json',
        success: function (data) {
            checkOwnership(data.property);
            getPlayerProperties(data.user)
            getPlayerInfo(data.user)
        },
        error: function(xhr, textStatus, error) {
            console.log('Error');
            console.log('xhr ', xhr);
            console.log('text, ', textStatus);
            console.log('Error', error);
        }
    })
});

function showAlert(message,property) {
    document.querySelector(".alert .message .successMessage").textContent = message + " " + property.name;
    document.querySelector(".alert").classList.remove("hideAlert");
    setTimeout(() => {
        document.querySelector(".alert").classList.add("hideAlert");
    }, 3000);
}

setupGame();

function payRent(playerID, property) {
    $.ajax({
        type: 'POST',
        url: '/userPayRent',
        contentType: 'application/json',
        processData: false,
        data: JSON.stringify({property: property, playerId: playerID}),
        dataType: 'json',
        success: function (data) {
            getPlayerInfo(data.user)
        },
        error: function(xhr, textStatus, error) {
            console.log('Error');
            console.log('xhr ', xhr);
            console.log('text, ', textStatus);
            console.log('Error', error);
        }
    })
}