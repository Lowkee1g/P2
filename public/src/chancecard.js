
function getQuote() {
    // Create the arrays
    let quotes = new Array(10);
    let quoteValue = new Array(10);
    quoteValue[0] = 1000;
    quoteValue[1] = -420;
    quoteValue[2] = 690;
    quoteValue[3] = 1000;
    quoteValue[4] = 2019;
    quoteValue[5] = -1000;
    quoteValue[6] = -1500;
    quoteValue[7] = 750;
    quoteValue[8] = -500;
    quoteValue[9] = -5000;
    // Initialize the arrays with quotes
    quotes[0] = "Bank error in your favor. Collect " + quoteValue[0] + "dk";

    quotes[1] = "Doctor’s fee. Pay " + quoteValue[1] + "dk";

    quotes[2] = "From sale of stock you get " + quoteValue[2] + "dk";

    quotes[3] = "Holiday fund matures. Receive " + quoteValue[3] + "dk";

    quotes[4] = "Your business boomed doing corona. Collect " + quoteValue[4] + "dk";

    quotes[5] = "Pay hospital fees of " + quoteValue[5] + "dk";

    quotes[6] = "You bought Pizza at school. Pay " + quoteValue[6] + "dk";

    quotes[7] = "You inherit " + quoteValue[7] + "dk";

    quotes[8] = "You have won second prize in a beauty contest. Pay " + quoteValue[8] + "dk";

    quotes[9] = "You got stuck shoveling snow in front of M3. Pay " + quoteValue[9] + "dk";

    // Get a random index into the arrays
    let i = Math.floor(Math.random() * quotes.length);

    $.ajax({
        type: 'POST',
        url: '/api/chanceData',
        data: JSON.stringify ({
            playerUser: 1,
            quote: quoteValue[i],
        }),
        contentType: 'application/json',
        success: function (data) {
            console.log("Chance: " + data);
        },
        error: function(xhr, textStatus, error) {
            console.log(error);
            console.log(xhr);
            console.log(textStatus);
        }
    })




    //update Database with ajax


    // Display the quote in the p class="quote"
    document.getElementById("quote").innerHTML = quotes[i];
}

// Get a reference to the button element
const closeButtonId = document.getElementById('close-button-id');
console.log(closeButtonId);
// Add a click event listener to the button
closeButtonId.addEventListener('click', function() {
    // Close the window when the button is clicked
    document.querySelector('.chance-card').style.display = 'none';
    console.log("test");
});