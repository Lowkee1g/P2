const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
var Tile = require('./TileModel');

class ChanceTile extends Tile {
    constructor(id, picture, chanceText){
        super('Chance', id); //Should this be name so that we can give each chance card it's own name
        this.chanceText = chanceText;
        this.picture = picture;
    }

    static changeMoney = async (id, money) => {
        const player = await prisma.user.findUnique({
            where: {
                id: id
            }
        })

        if (!player) {
            console.log(`Error: player ${id} not found in the database`);
            return;
        }

        await prisma.user.update({
            where: {
                id: id
            },
            data: {
                money: player.money + money
            }
        })
    }

}

module.exports = ChanceTile