var Player = require("../models/Player");
var Property = require("../models/PropertyTile");
const { PrismaClient } = require("@prisma/client");
var session = require("express-session");
const prisma = new PrismaClient();

let playerUser;

module.exports = class player {
   static async getUserInformation(req, res, next) {
      try {
         const user = await Player.find(1);
         res.json(user);
      } catch (error) {
         res.status(500).json({ error: error.message });
      }
   }

   static async createPlayer(req,res,next) {
      try {
         const user = await prisma.user.create({
               data: { name: req.body.data, money: 16000 },
         });
         playerUser = new Player(user.name, user.id, user.money);
         res.json(user);
      } catch (error) {
         res.status(500).json({error: error.message})
      }
   }

   static async userBuyProperty(req, res, propertyId){
      try {
         if (playerUser) {
            await playerUser.buyProperty(propertyId);
            } else {
            res.status(500).json({error: 'playerUser is undefined or null'});
            }
      } catch (error) {
         res.status(500).json({error: error.message})
      }
   }

   static async userSellProperty(req, res, propertyId){
      try {
         if (playerUser) {
            await playerUser.sellProperty(propertyId);
            } else {
            res.status(500).json({error: 'playerUser is undefined or null'});
            }
      } catch (error) {
         res.status(500).json({error: error.message})
      }
   }
      
   static async userUpDownGradeProperty(req, res, propertyId, changeNo){
      try {
         if (playerUser) {
            await playerUser.UpDownGradeProperty(propertyId, changeNo);
            } else {
            res.status(500).json({error: 'playerUser is undefined or null'});
            }
      } catch (error) {
         res.status(500).json({error: error.message})
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
