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

    buyProperty(){

    }

    sellProperty(){

    }
}

module.exports = Player