const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
class Player {
    constructor(name, id, money, properties, hasTurn) {
        this.name = name;
        this.id = id;
        this.money = money;
        this.properties = properties;
        this.hasTurn = hasTurn;
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

    throwDice() {}

    buyProperty() {}

    sellProperty() {}

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
