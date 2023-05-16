const fields = document.querySelectorAll('.property');
const popup = document.querySelector('.popup');
const closePopup = document.querySelector('.closePopup');
const popupTitle = document.querySelector('.popup-title');
const popupHeader = document.querySelector('.popup-header');
const popupDescription = document.querySelector('.popup-description');

const railroads = document.querySelectorAll('.railroad');

let dummyProperties = [
        {id: 1, userid: null, name: "Frederiksberg", houses: 0, price: 3000, rent: 900, collection: "København K", owned: false},
        {id: 2, userid: null, name: "Østerbro", houses: 0, price: 2500, rent: 750, collection: "København K", owned: false},
        {id: 3, userid: 3, name: "Hellerup", houses: 0, price: 1500, rent: 450, collection: "Whiskeybæltet", owned: true},
        {id: 4, userid: null, name: "Charlotten- lund", houses: 0, price: 1500, rent: 450, collection: "Whiskeybæltet", owned: false},
        {id: 5, userid: 3, name: "Gentofte", houses: 0, price: 1500, rent: 450, collection: "Whiskeybæltet", owned: true},
        {id: 6, userid: null, name: "Strandvejen", houses: 0, price: 5500, rent: 1400, collection: "Expensive", owned: false},
        {id: 7, userid: null, name: "Amalienborg", houses: 0, price: 5000, rent: 1350, collection: "Expensive", owned: false},
        {id: 8, userid: null, name: "5C", houses: 0, price: 2500, rent: 750, collection: "Transport", owned: false},
        {id: 9, userid: null, name: "18'eren", houses: 0, price: 2500, rent: 750, collection: "Transport", owned: false},
        {id: 10, userid: null, name: "7A", houses: 0, price: 2500, rent: 750, collection: "Transport", owned: false},
        {id: 11, userid: null, name: "Nørreport Station", houses: 0, price: 2500, rent: 750, collection: "Transport", owned: false},
        {id: 12, userid: null, name: "Sydhavn Station", houses: 0, price: 2500, rent: 750, collection: "Transport", owned: false},
        {id: 13, userid: null, name: "Hovedbane gaarden", houses: 0, price: 2500, rent: 750, collection: "Transport", owned: false},
        {id: 14, userid: null, name: "Jespers Torvekøkken", houses: 0, price: 750, rent: 250, collection: "Universitet", owned: false},
        {id: 15, userid: null, name: "Slusen", houses: 0, price: 750, rent: 250, collection: "Universitet", owned: false},
        {id: 16, userid: null, name: "Grupperum", houses: 0, price: 750, rent: 250, collection: "Universitet", owned: false},
        {id: 17, userid: null, name: "Aarhus", houses: 0, price: 500, rent: 150, collection: "Jylland", owned: false},
        {id: 18, userid: null, name: "Aalborg", houses: 0, price: 500, rent: 150, collection: "Jylland", owned: false},
        {id: 19, userid: null, name: "Ringkøbing", houses: 0, price: 500, rent: 150, collection: "Jylland", owned: false},
        {id: 20, userid: null, name: "Herlev", houses: 0, price: 500, rent: 150, collection: "Sjælland", owned: false},
        {id: 21, userid: null, name: "Hvidovre", houses: 0, price: 500, rent: 150, collection: "Sjælland", owned: false},
        {id: 22, userid: null, name: "Ørslev", houses: 0, price: 500, rent: 150, collection: "Sjælland", owned: false},
        {id: 23, userid: null, name: "Valby", houses: 0, price: 600, rent: 200, collection: "København S", owned: false},
        {id: 24, userid: null, name: "Sydhavn", houses: 0, price: 650, rent: 250, collection: "København S", owned: false},
        {id: 25, userid: null, name: "Nørrebro", houses: 0, price: 600, rent: 200, collection: "København S", owned: false},
        {id: 26, userid: 3, name: "Amager Strandpark", houses: 0, price: 600, rent: 200, collection: "Amager", owned: true},
        {id: 27, userid: null, name: "Flyvergrillen", houses: 0, price: 600, rent: 200, collection: "Amager", owned: false},
        {id: 28, userid: null, name: "Islands Brygge", houses: 0, price: 600, rent: 200, collection: "Amager", owned: false},
];


// Iterate over each field
fields.forEach(field => {
  // Add a click event listener to the field
  field.addEventListener('click', () => {
    // Check if the field has the class 'property'
    if (field.classList.contains('property')) {
      // Get the name and price of the property
      const name = field.querySelector('.name').textContent;
      const price = field.querySelector('.price').textContent;
      
      // Get the color of the color bar
      const colorBar = field.querySelector('.color-bar');
      const color = window.getComputedStyle(colorBar).backgroundColor;
      
      // Update the popup with the property details
      popupTitle.textContent = name;
      popupHeader.style.backgroundColor = color;
      popupHeader.style.border = '1px solid black';
      popupDescription.querySelector('.price').textContent = 'Price: ' + price;
      
      // Calculate and update the house prices based on the property price
      document.querySelector('.one-house').textContent = 'ONE: ' + parseInt(price)*0.2 + ' DKK';
      document.querySelector('.two-house').textContent = 'TWO: ' + parseInt(price)*0.4 + ' DKK';
      document.querySelector('.three-house').textContent = 'THREE: ' + parseInt(price)*0.6 + ' DKK';
      document.querySelector('.four-house').textContent = 'FOUR: ' + parseInt(price)*0.8 + ' DKK';
      
      // Display the popup
      popup.style.display = 'block';
    }
  });
});


// Iterate over each railroad field
railroads.forEach(field => {
  // Add a click event listener to the field
  field.addEventListener('click', () => {
    // Check if the field has the class 'railroad'
    if (field.classList.contains('railroad')) {
      // Get the name and price of the railroad
      const name = field.querySelector('.name').textContent;
      const price = field.querySelector('.price').textContent;
      
      // Update the popup with the railroad details
      popupTitle.textContent = name;
      popupHeader.style.backgroundColor = 'white';
      popupHeader.style.border = '1px solid black';
      popupDescription.querySelector('.price').textContent = 'Price: ' + price;
      
      // Display the popup
      popup.style.display = 'block';
    }
  });
});



closePopup.addEventListener('click', () => {
  popup.style.display = 'none';
});


const buyButton = document.querySelector('.buy-button');
buyButton.addEventListener('click', () => {
  alert('BOUGHT!');
});

const upgradeButton = document.querySelector('.upgrade-button');
upgradeButton.addEventListener('click', () => {
  alert('UPGRADED!');
});

const sellButton = document.querySelector('.sell-button');
sellButton.addEventListener('click', () => {
  alert('SOLD!');
});

const containers = document.querySelectorAll('.container');

// Loop through all containers
containers.forEach(container => {
  // Add a click event listener to each container
  container.addEventListener('click', () => {
    // Get the name of the clicked field
    const name = container.querySelector('.name').textContent;

    // Loop through all containers
containers.forEach(container => {
    // Add a click event listener to each container
    container.addEventListener('click', () => {
      // Get the name of the clicked field
      const name = container.querySelector('.name').textContent;
  
      // Check if the property is owned
      dummyProperties.forEach(property => {
        if (property.name === name) {  
          console.log(property.owned);
  
          // Disable the buy button if the property is owned
          if (property.owned) {
            buyButton.style.background = 'grey';
            buyButton.style.pointerEvents = 'none';
          } else {
            buyButton.style.background = '';
            buyButton.style.pointerEvents = 'auto';
          }
  
          // Disable the upgrade and sell buttons if the property is not owned
          if (!property.owned) {
            upgradeButton.style.background = 'grey';
            upgradeButton.style.pointerEvents = 'none';
            sellButton.style.background = 'grey';
            sellButton.style.pointerEvents = 'none';
          } else {
            upgradeButton.style.background = '';
            upgradeButton.style.pointerEvents = 'auto';
            sellButton.style.background = '';
            sellButton.style.pointerEvents = 'auto';
          }
          //display the owner of the property userid
            if (property.userid === null) {
                document.querySelector('.owner').textContent = 'Owner: None';
                } else {
                document.querySelector('.owner').textContent = 'Owner: USER' + property.userid;
                }
        }
      });
    });
  });
  
  });
});




    