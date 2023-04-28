var Player = require("../models/Player");
const { PrismaClient } = require('@prisma/client');
var session = require('express-session')
const prisma = new PrismaClient();

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
            let playerUser = new Player(user.name, user.id, user.money);
            res.json(user);
         } catch (error) {
            res.status(500).json({error: error.message})
         }
     }

     static async buyProperty(req, res, propertyId, playerId){
         try {
            const user = await playerUser.buyProperty(propertyId);
            res.json(user);
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