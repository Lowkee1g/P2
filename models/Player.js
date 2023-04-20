const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
class Player {
    constructor(name, id, money, hasTurn){
        this.name = name;
        this.id = id;
        this.money = money;
        this.properties = [0,1,2,3,4];
        this.numOfProperties = 0;
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
        const prop = await prisma.property.update({
            where: {id: 1}, //Den skal tage propertyId her men det virker ikke helt
            data: {
                userId: 1,
                // userId: this.id,
                owned: true, 
            },
        });

        console.log(prop, propertyId)
        this.properties[this.numOfProperties] = propertyId;
        this.numOfProperties++;

        const thisPlayer = await prisma.property.update({
            where: {id: this.id},
            data: {properties: this.properties}
        });
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