function getQuote() {
    // Create the arrays
    let quotes = new Array(10);

    // Initialize the arrays with quotes
    quotes[0] = "Bank error in your favor. Collect 1400dk";

    quotes[1] = "Doctor’s fee. Pay 420dk";

    quotes[2] = "From sale of stock you get 690dk";

    quotes[3] = "Holiday fund matures. Receive 1000dk";

    quotes[4] = "Your business boomed doing corona. Collect 2019dk";

    quotes[5] = "Pay hospital fees of 1000dk";

    quotes[6] = "You bought Pizza at school. Pay 1500dk";

    quotes[7] = "You inherit 750dk";

    quotes[8] = "You have won second prize in a beauty contest. Pay 500dk";

    quotes[9] = "You got stuck shoveling snow in front of M3. Pay 5000dk";

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

function getChanceCard() {
    let a;
    if (a % 40 == 7 || a % 40 == 22 || a % 40 == 36) {
    document.querySelector('.chance-card').style.display = 'block';
    getQuote();
}}

