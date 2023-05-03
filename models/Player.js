const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
class Player {
    constructor(name, id, money){
        this.name = name;
        this.id = id;
        this.money = money;
    }

    getId(){
        return this.id
    }

    static find = async (id) => {
        const user = await prisma.user.findUnique({
            where: { id: id },
            include: {
                properties: true,
            },
        });
        return user;
    };

    throwDice(){}
    
    async buyProperty(propertyId){
        const prop = await prisma.property.update({
            where: {id: parseInt(propertyId)}, 
            data: {
                userId: this.id,
                owned: true, 
            },
        });

        console.log(this);
        console.log('Purchased the following property');
        console.log(prop);
    }

    async sellProperty(propertyId) {
        const prop = await prisma.property.update({
            where: {id: parseInt(propertyId)}, 
            data: {
                userId: null,
                owned: false, 
            },
        });
        console.log(this);
        console.log('Sold the following property');
        console.log(prop);
    }

    static payRent = async (fromPlayer, toPlayer, amount) => {
        console.log("Charging: " + amount + " from player: " + fromPlayer.name + " to player: " + toPlayer.name);
        // Charge the player
        const newBalance = fromPlayer.money - amount;

        // remove money from one player
        await prisma.user.update({
            where: {
                id: fromPlayer.id,
            },
            data: {
                money: newBalance,
            },
        });

        // add money to another player
        await prisma.user.update({
            where: {
                id: toPlayer.id,
            },
            data: {
                money: toPlayer.money + amount,
            },
        });
    };
}

module.exports = Player;
