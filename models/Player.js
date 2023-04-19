const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
class Player {
    constructor(name, id, money, properties, hasTurn){
        this.name = name;
        this.id = id;
        this.money = money;
        this.properties = properties;
        this.hasTurn = hasTurn;
    }

    static find = async () => {
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
        const prop = await prisma.property.findUnique({
            where: {id: propertyId},
            data: {
                userID: 1,
                // userID: this.id,
                owned: true, 
            },
        });

        this.properties.push(prop)

        const thisPlayer = await prisma.user.findUnique({
            where: {id: this.id},
            data: {properties: this.properties}
        });
    }

    static sellProperty = async (propertyId) => {
        const prop = await prisma.property.findUnique({
            where: {id: propertyId},
            data: {
                userID: this.id,
                owned: true, 
            },
        });

        this.properties.pop(prop)

        const thisPlayer = await prisma.user.findUnique({
            where: {id: this.id},
            data: {properties: this.properties}
        });
    }
}

module.exports = Player