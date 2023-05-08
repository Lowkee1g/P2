const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
class Player {
    constructor(id){
        this.id = id;
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

    throwDice(){};
    
    async buyProperty(propertyId){
        const propertyInfo = await prisma.property.findUnique({
            where: {id: parseInt(propertyId)}
        });

        if(!propertyInfo.owned){
            const propUpdate = await prisma.property.update({
                where: {id: parseInt(propertyId)}, 
                data: {
                    userId: this.id,
                    owned: true, 
                },
            });

            const userInfo = await prisma.user.findUnique({
                where: {id: this.id},
            });

            const newBalance = userInfo.money - propertyInfo.price;

            const userUpdate = await prisma.user.update({
                where: {id: parseInt(this.id)},
                data: {money: newBalance},
            });
    
            console.log('Player ', userUpdate);
            console.log('Purchased the following property');
            console.log(propUpdate);
        } else {
            console.log('Property is already owned');
        }
    }

    async sellProperty(propertyId) {
        const propertyInfo = await prisma.property.findUnique({
            where: {id: parseInt(propertyId)}
        });
        
        if(propertyInfo.userId != this.id){
            const propUpdate = await prisma.property.update({
                where: {id: parseInt(propertyId)}, 
                data: {
                    userId: null,
                    owned: false, 
                },
            });

            const userInfo = await prisma.user.findUnique({
                where: {id: this.id}
            });
    
            newBalance = userInfo.money + propertyInfo.price;
    
            const userUpdate = await prisma.property.update({
                where: {id: this.id},
                data: {money: newBalance},
            });
    
            console.log('Player ', userUpdate);
            console.log('Sold the following property');
            console.log(propUpdate);
        } else {
            console.log('This property does not belong to ', userUpdate);
        }
    }

    async UpDownGradeProperty(propertyId, changeNo) {

        const propertyInfo = await prisma.property.findUnique({
            where: {id: parseInt(propertyId)}
        });
        
        console.log('propertyInfo.userId = ', propertyInfo.userId);
        if(propertyInfo.userId === this.id && propertyInfo.houses + changeNo < 6){ //The right user buys and property does not reach max houses
            const propertyUpdate = await prisma.property.update({
                where: {id: parseInt(propertyId)}, 
                data: {
                    houses: parseInt(propertyInfo.houses) + parseInt(changeNo),
                    rent: rent * 1.3,
                },
            });

            const userInfo = await prisma.user.findUnique({
                where: {id: this.id},
            });

            const newBalance = userInfo.money + (prop.price * 0.2 * parseInt(changeNo));

            const userUpdate = await prisma.player.update({
                where: {id: this.id},
                data: {money: pareseInt(newBalance)},
            });

            console.log('Player ', userUpdate);
            console.log('Up- or down-graded the following property');
            console.log(propertyUpdate);
        } else {
            console.log('This property does not belong to', userUpdate);
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
