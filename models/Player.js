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

    async UpDownGradeProperty(propertyId, changeNo) {
        //Det her skal fjernes efter test
        this.buyProperty(propertyId)
        // Hertil 

        const propertyInfo = await prisma.property.findUnique({
            where: {id: parseInt(propertyId)},
            // include: {
            //     houses: true,
            //     userId: true,
            // }
        });
        
        console.log('propertyInfo.userId = ', propertyInfo.userId);
        if(propertyInfo.userId === this.id){
            const prop = await prisma.property.update({
                where: {id: parseInt(propertyId)}, 
                data: {
                    houses: parseInt(propertyInfo.houses) + parseInt(changeNo) 
                },
            });

            console.log(this);
            console.log('Up- or down-graded the following property');
            console.log(prop);
        } else {
            console.log('This property does not belong to', this);
        }
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
