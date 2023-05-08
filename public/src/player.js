// Wait for the DOM to load before executing the script
document.addEventListener('DOMContentLoaded', () => {
    // Select all the card elements
    const cards = document.querySelectorAll('.card');

    // Add a click event listener to each card
    cards.forEach(card => {
        card.addEventListener('click', () => {
            // Get the property name and description within the clicked card
            const propNameElement = card.querySelector('.propname');
            const propDescElement = card.querySelector('.propDesc');

            // Get the text content of the elements
            const propName = propNameElement ? propNameElement.innerText.trim() : '';
            const propDesc = propDescElement ? propDescElement.innerText.trim() : '';

            // Log the property name and description to the console
            console.log('Property Name:', propName);
            console.log('Property Description:', propDesc);
        });
    });
});