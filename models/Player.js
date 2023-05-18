const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
class Player {
    constructor(id){
        this.id = id;
    };

    getId(){
        return this.id
    };

    static find = async (id, ctx) => {
        let usr = {
            where: { id: id },
            include: {
                properties: true,
            },
        };
        if(ctx === null){
            return await prisma.user.findUnique(usr);
        } else {
            return await ctx.prisma.user.findUnique(usr);
        }
    };

    static findByName = async (name, ctx) => {
        let usr = {
            where: { name: name },
            include: {
                properties: true,
            },
        };
        if (ctx === null){
            return await prisma.user.findUnique(usr);
        } else {
            return await ctx.prisma.user.findUnique(usr);
        }
    };
    
    async buyProperty(propertyId, ctx){
        let findWhere =  {where: {id: parseInt(propertyId)}};
        let propertyInfo;
        if (ctx === null){
            propertyInfo = await prisma.property.findUnique(findWhere);
        } else {
            propertyInfo = await ctx.prisma.property.findUnique(findWhere);
        }
        
        if(!propertyInfo.owned){
            let updateWhere = {
                where: {id: parseInt(propertyInfo.id)}, 
                data: {
                    userId: this.id,
                    owned: true, 
                },
            };

            let updateProperty;

            if (ctx === null){
                updateProperty = await prisma.property.update(updateWhere);
            } else {
                updateProperty = await ctx.prisma.property.update(updateWhere);
            }

            this.updateMoney(this.id, -propertyInfo.price, ctx);

            return updateProperty;

        } else {
            console.log('Property is already owned');
        }
    };

    async sellProperty(propertyId, ctx) {
        let findWhere =  {where: {id: parseInt(propertyId)}};
        let propertyInfo;
        if (ctx === null){
            propertyInfo = await prisma.property.findUnique(findWhere);
        } else {
            propertyInfo = await ctx.prisma.property.findUnique(findWhere);
        }

        if(propertyInfo.userId == this.id){
            let updateWhere = {
                where: {id: parseInt(propertyId)}, 
                data: {
                    userId: null,
                    owned: false, 
                },
            };

            let updateProperty;
            
            if (ctx === null){
                updateProperty = await prisma.property.update(updateWhere);
            } else {
                updateProperty = await ctx.prisma.property.update(updateWhere);
            }

            this.updateMoney(this.id, propertyInfo.price, ctx); 

            return updateProperty;

        } else {
            console.log('This property does not belong to this player');
        }
    };

    async upDownGradeProperty(propertyId, changeNo, ctx) {
        let findWhere = {where: {id: parseInt(propertyId)}};
        let propertyInfo;
        if (ctx === null) {
            propertyInfo = await prisma.property.findUnique(findWhere);
        } else {
            propertyInfo = await ctx.prisma.property.findUnique(findWhere);
        }
        
        if(propertyInfo.userId === this.id && propertyInfo.houses + changeNo < 6){ //The right user buys and property does not reach max houses
            let updateWhere = {
                where: {id: parseInt(propertyId)}, 
                data: {
                    houses: parseInt(propertyInfo.houses) + parseInt(changeNo),
                    rent: propertyInfo.rent * 1.3,
                },
            };

            let updateProperty;

            if (ctx === null) {
                updateProperty = await prisma.property.update(updateWhere);
            } else {
                updateProperty = await ctx.prisma.property.update(updateWhere);
            }

            this.updateMoney(this.id, -(propertyInfo.price * 0.2 * parseInt(changeNo)), ctx);

            return updateProperty;

        } else {
            console.log('This property does not belong to this player');
        }
    };

    static payRent = async (fromPlayer, toPlayer, amount, ctx) => {
        console.log("Charging: " + amount + " from player: " + fromPlayer.name + " to player: " + toPlayer.name);
        // Charge the player
        this.updateMoney(fromplayer, -amount, ctx);
        this.updateMoney(toPlayer, amount, ctx)
    };

    async updateMoney(playerId, changeAmount, ctx){
        let findWhere = {
            where: {id: playerId}
        };

        let userInfo;

        if (ctx === null) {
            userInfo = await prisma.user.findUnique(findWhere);
        } else {
            userInfo = await ctx.prisma.user.findUnique(findWhere);
        }

        let newBalance = userInfo.money + changeAmount;
        let updateWhere = {
            where: {id: parseInt(playerId)},
            data: {money: newBalance},
        };

        if (ctx === null) {
            return await prisma.user.update(updateWhere);            
        } else {
            return await ctx.prisma.user.update(updateWhere);            
        }
    };

    static endTurn = async (currentPlayer,nextPlayerId) => {
        await prisma.user.update({
            where: {
                id: currentPlayer.id,
            },
            data: {
                hasTurn: false,
            }
        })

        let thisPlayerHasTurn = await prisma.user.update({
            where: {
                id: nextPlayerId,
            },
            data: {
                hasTurn: true,
            }
        })

        return thisPlayerHasTurn;
    }

    static getAllPlayers = async (players) => {
        const users =  await prisma.user.findMany({
            where: {
                name: { in: players },
            }
        });
        return users;
    };
}

module.exports = Player;
