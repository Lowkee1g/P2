const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
class Player {
    constructor(id){
        this.id = id;
    }

    getId(){
        return this.id
    }

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
            return await prisma.user.findUnique();
        } else {
            return await ctx.prisma.user.findUnique();
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
                where: {id: parseInt(propertyId)}, 
                data: {
                    userId: this.id,
                    owned: true, 
                },
            };

            if (ctx === null){
                await prisma.property.update(updateWhere);
            } else {
                await ctx.prisma.property.update(updateWhere);
            }

            this.updateMoney(this.id, -propertyInfo.price);

        } else {
            console.log('Property is already owned');
        }
    }

    async sellProperty(propertyId, ctx) {
        let findWhere =  {where: {id: parseInt(propertyId)}};
        let propertyInfo;
        if (ctx === null){
            propertyInfo = await prisma.property.findUnique(findWhere);
        } else {
            propertyInfo = await ctx.prisma.property.findUnique(findWhere);
        }
        
        if(propertyInfo.userId != this.id){
            let updateWhere = {
                where: {id: parseInt(propertyId)}, 
                data: {
                    userId: null,
                    owned: false, 
                },
            };
            
            if (ctx === null){
                await prisma.property.update(updateWhere);
            } else {
                await ctx.prisma.property.update(updateWhere);
            }

            this.updateMoney(this.id, propertyInfo.price); 

        } else {
            console.log('This property does not belong to this player');
        }
    }

    async UpDownGradeProperty(propertyId, changeNo, ctx) {
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

            if (ctx === null) {
                await prisma.property.update(updateWhere);
            } else {
                await ctx.prisma.property.update(updateWhere);
            }

            const userInfo = await prisma.user.findUnique({
                where: {id: this.id},
            });

            this.updateMoney(this.id, -(prop.price * 0.2 * parseInt(changeNo)))
        } else {
            console.log('This property does not belong to this player');
        }
    }

    static payRent = async (fromPlayer, toPlayer, amount) => {
        console.log("Charging: " + amount + " from player: " + fromPlayer.name + " to player: " + toPlayer.name);
        // Charge the player
        this.updateMoney(fromplayer, -amount);
        this.updateMoney(toPlayer, amount)
    };

    async updateMoney(playerId, changeAmount){
        const userInfo = await prisma.user.findUnique({
            where: {id: playerId}
        });

        let newBalance = userInfo.money + changeAmount;

        return await prisma.user.update({
            where: {id: parseInt(playerId)},
            data: {money: newBalance},
        });
    }
}

module.exports = Player;
