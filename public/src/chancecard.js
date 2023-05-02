function getQuote() {
    // Create the arrays
    let quotes = new Array(10);
    let quote0 = 1000;
    let quote1 = 420;
    let quote2 = 690;
    let quote3 = 1000;
    let quote4 = 2019;
    let quote5 = 1000;
    let quote6 = 1500;
    let quote7 = 750;
    let quote8 = 500;
    let quote9 = 5000;
    // Initialize the arrays with quotes
    quotes[0] = "Bank error in your favor. Collect " + quote0 + "dk";

    quotes[1] = "Doctor’s fee. Pay " + quote1 + "dk";

    quotes[2] = "From sale of stock you get " + quote2 + "dk";

    quotes[3] = "Holiday fund matures. Receive " + quote3 + "dk";

    quotes[4] = "Your business boomed doing corona. Collect " + quote4 + "dk";

    quotes[5] = "Pay hospital fees of " + quote5 + "dk";

    quotes[6] = "You bought Pizza at school. Pay " + quote6 + "dk";

    quotes[7] = "You inherit " + quote7 + "dk";

    quotes[8] = "You have won second prize in a beauty contest. Pay " + quote8 + "dk";

    quotes[9] = "You got stuck shoveling snow in front of M3. Pay " + quote9 + "dk";

    // Get a random index into the arrays
    let i = Math.floor(Math.random() * quotes.length);

    // Display the quote in the p class="quote"
    document.getElementById("quote").innerHTML = quotes[i];
}

// Get a reference to the button element
const closeButton = document.getElementById('close-button');
console.log(closeButton);
// Add a click event listener to the button
closeButton.addEventListener('click', function() {
    // Close the window when the button is clicked
    document.querySelector('.chance-card').style.display = 'none';
    console.log("test");
});

let a;
if (a % 40 == 7 || a % 40 == 22 || a % 40 == 36) {
    document.querySelector('.chance-card').style.display = 'block';
    getQuote();
}

