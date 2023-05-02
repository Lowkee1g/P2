var Player = require("../models/Player");
var Property = require("../models/PropertyTile");
const { PrismaClient } = require("@prisma/client");
var session = require("express-session");
const prisma = new PrismaClient();

module.exports = class player {
    static async getUserInformation(req, res, next) {
        try {
            const user = await Player.find();
            res.json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    static async createPlayer(req, res, next) {
        try {
            const user = await prisma.user.create({
                data: { name: req.body.data, money: 16000 },
            });
            res.json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    static async chargeRent(req, res, next) {
        try {
			console.log("Charging rent from player: " + req.body.player);
            // Get the property
            const propertyToCharge = await Property.getProperty(req.body.tile);

            // Get the player
            const playerToCharge = await Player.find(req.body.player);

            // Check if the player owns the property
            if (propertyToCharge.userId !== playerToCharge.id) {
                // Check if the property is owned by someone else
                if (propertyToCharge.userId !== null) {
					// Charge the player
					//console.log(await Player.find(propertyToCharge.userId));
					Player.payRent(playerToCharge, await Player.find(propertyToCharge.userId), propertyToCharge.rent);
                }
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};
