// Function for charging rent
async function chargeRent(player, tile) {

    // Get the property
    const propertyToCharge = await prisma.property.findUnique({
        where: {
            name: tile
        }
    })

    // Check if property exists
    if (!propertyToCharge) {
        console.log(`Error: property ${tile} not found in the database`);
        return;
    }



    // Get the player
    const playerToCharge = await prisma.user.findUnique({
        where: {
            name: player
        }
    })

    // Check if player exists
    if (!playerToCharge) {
        console.log(`Error: player ${player} not found in the database`);
        return;
    }



    // Check if the player owns the property
    if (propertyToCharge.userId !== player) {

        // Check if the property is owned by someone else
        if (propertyToCharge.userId !== null) {
        
            // Charge the player
            const newBalance = playerToCharge.money - propertyToCharge.rent;
            await prisma.user.update({
                where: {
                    name: player
                },
                data: {
                    balance: newBalance
                }
            })
        }
    }
    // Return the new balance
    return newBalance
}

module.exports = chargeRent;