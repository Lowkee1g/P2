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
        const propertyInfo = await prisma.property.findUnique({
            where: {id: propertyId}
        });

        if(!propertyInfo.owned){
            const propUpdate = await prisma.property.update({
                where: {id: parseInt(propertyId)}, 
                data: {
                    userId: this.id,
                    owned: true, 
                },
            });
    
            this.money -= propertyInfo.price;
    
            const userUpdate = await prisma.property.update({
                where: {id: this.id},
                data: {money: this.money},
            });
    
            console.log(this);
            console.log('Purchased the following property');
            console.log(propUpdate);
        } else {
            console.log('Property is already owned');
        }
    }

    async sellProperty(propertyId) {
        const propertyInfo = await prisma.property.findUnique({
            where: {id: propertyId}
        });
        
        if(propertyInfo.userId != this.id){
            const propUpdate = await prisma.property.update({
                where: {id: parseInt(propertyId)}, 
                data: {
                    userId: null,
                    owned: false, 
                },
            });
    
            this.money += propertyInfo.price;
    
            const userUpdate = await prisma.property.update({
                where: {id: this.id},
                data: {money: this.money},
            });
    
            console.log(this);
            console.log('Sold the following property');
            console.log(propUpdate);
        } else {
            console.log('This property does not belong to ', this);
        }
    }

    async UpDownGradeProperty(propertyId, changeNo) {

        const propertyInfo = await prisma.property.findUnique({
            where: {id: parseInt(propertyId)}
        });
        
        console.log('propertyInfo.userId = ', propertyInfo.userId);
        if(propertyInfo.userId === this.id && propertyInfo.houses + changeNo < 6){ //The right user buys and property does not reach max houses
            const prop = await prisma.property.update({
                where: {id: parseInt(propertyId)}, 
                data: {
                    houses: parseInt(propertyInfo.houses) + parseInt(changeNo),
                    rent: rent * 1.3,
                },
            });

            this.money -= (prop.price * 0.2 * parseInt(changeNo));

            const user = await prisma.player.update({
                where: {id: this.id},
                data: {money: this.money}
            });

            console.log(user); // Remove this line after testing
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
