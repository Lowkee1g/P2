const { PrismaClient } = require('@prisma/client');
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
}

module.exports = Player