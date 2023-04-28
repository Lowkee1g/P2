var Player = require("../models/Player");
const { PrismaClient } = require('@prisma/client');
var session = require('express-session')
const prisma = new PrismaClient();

let playerUser;

module.exports = class player {
    static async getUserInformation(req, res, next){
        try {
           const user = await Player.find();
           res.json(user);
        } catch (error) {
           res.status(500).json({error: error.message})
        }
     }

     static async createPlayer(req,res,next) {
         try {
            const user = await prisma.user.create({
               data: {name: req.body.data, money: 16000}
            });
            playerUser = new Player(user.name, user.id, user.money);
            res.json(user);
         } catch (error) {
            res.status(500).json({error: error.message})
         }
     }

      static async buyProperty(req, res, propertyId){
         try {
            console.log(playerUser);
            console.log(playerUser.getId());
            if (playerUser) {
               await playerUser.buyProperty(propertyId);
             } else {
               res.status(500).json({error: 'playerUser is undefined or null'});
             }
                         // await playerUser.buyProperty(propertyId);
         } catch (error) {
            res.status(500).json({error: error.message})
         }
      }

      static async sellProperty(req, res, next){
         try {
            const user = await playerUser.sellProperty();
            res.json(user);
         } catch (error) {
            res.status(500).json({error: error.message})
         }
      }
}