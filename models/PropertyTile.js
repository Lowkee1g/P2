const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
var Tile = require('./TileModel');

class PropertyTile extends Tile {
    constructor(name, id, picture, price, houses, hotel){
        super(name, id);
        this.picture = picture;
        this.price = price;
        this.houses = houses;
        this.hotel = hotel;
    }

    static getProperty = async (fieldName) => {
        const property = await prisma.property.findUnique({
            where: {
                name: fieldName
            }
        })

        if (!property) {
            console.log(`Error: property ${tile} not found in the database`);
            return;
        }

        return property;
    }
}

module.exports = PropertyTile