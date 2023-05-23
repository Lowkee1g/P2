var Player = require("../models/Player");
var Property = require("../models/PropertyTile");
var Chance = require("../models/ChanceTileModel");
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
         const user = await prisma.user.upsert({
            where: {
              name: req.body.data,
            },
            update: { money: 16000},
            create: {
              name: req.body.data,
              money: 16000,
            },
          })
         playerUser = new Player(user.id);
         res.json(user);
      } catch (error) {
         res.status(500).json({error: error.message})
      }
   }

   static async userBuyProperty(req, res){
      try {
         const property = await Player.buyProperty(req.body.propertyID, req.body.user, null);
         const user = await Player.findByName(req.body.user.name, null)
         res.send(
            {property: property,
            user: user,
            message: "You have successfully bought"
            });
      } catch (error) {
         res.status(500).json({error: error.message})
      }
   }

   static async userSellProperty(req, res){
      try {
         const property = await Player.sellProperty(req.body.propertyID, req.body.user, null)
         const user = await Player.findByName(req.body.user.name, null)
         res.send(
            {property: property,
            user: user,
            message: "You have successfully sold"
            });
      } catch (error) {
         res.status(500).json({error: error.message})
      }
   }
      
   static async userUpgradeProperty(req, res){
      try {
         const property = await Player.upgradeProperty(req.body.propertyID, req.body.user, null);
         const user = await Player.findByName(req.body.user.name, null)
         res.send(
            {property: property,
            user: user,
            message: "You have successfully upgraded"
         });
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
	
	static async chanceData(req, res) {
		try {
			let User = await Chance.changeMoney(req.body.playerUser, req.body.quote);
         console.log(User);
         res.json(User);
		}
		catch (error) {
			res.status(500).json({ error: error.message });
		}
	}

   // Change currentPlayers hasturn to 0 and set next players hasturn to 1 and return next player
   static async endTurn(req, res) {
		try {
			let currentPlayer = req.body.data;
         let newPlayerTurn = await Player.endTurn(currentPlayer,req.body.nextPlayer);
         console.log(req.body.nextPlayer);
         console.log(newPlayerTurn);
         res.json(newPlayerTurn);
		}
		catch (error) {
			res.status(500).json({ error: error.message });
		}
	}


   static async getSpecificProperty(req, res) {
      try {
         let specificProperty = await Property.getProperty(req.query.fieldName);
         res.send(specificProperty);
      }
      catch (error) {
         res.status(500).json({ error: error.message });
      }
   }

   static async userPassStart(req, res) {
      try {
         console.log('player_controller = ', req.body.playerId);
         let playerUpdate = await Player.updateMoney(req.body.playerId, req.body.changeAmount, null);
         res.send(playerUpdate);
      }
      catch (error) {
         res.status(500).json({ error: error.message });
      }
   }
};
