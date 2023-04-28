const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
class Player {
    constructor(name, id, money, hasTurn, properties){
        this.name = name;
        this.id = id;
        this.money = money;
        this.properties = properties;
        this.hasTurn = hasTurn;
    }

    getProperties(){
        return this.properties
    }
    getId(){
        return this.id
    }

    static find = async () => {
        console.log(this.id);
        const user = await prisma.user.findUnique({
            where: {id: 1},
            include: {
                properties: true,
            },
        });
        return user
    }

    throwDice(){

    }

    

    static buyProperty = async (propertyId) => {
        console.log(getId());
        const prop = await prisma.property.update({
            where: {id: parseInt(propertyId)}, 
            data: {
                userId: this.id,
                owned: true, 
            },
        });

        console.log('in player class', prop, propertyId);
    }

    static sellProperty = async (propertyId) => {
        const prop = await prisma.property.update({
            where: {id: propertyId},
            data: {
                userId: this.id,
                owned: true, 
            },
        });

        this.properties.pop(prop)

        const thisPlayer = await prisma.user.update({
            where: {id: this.id},
            data: {properties: this.properties}
        });
    }
}

module.exports = Player