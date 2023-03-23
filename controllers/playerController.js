var Player = require("../models/Player");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = class player {
   // return index view (board) and user
   static async index(req, res, next){
      try {
         const user = await Player.find();
         res.render('index.pug', {
          user: user,
         });
      } catch (error) {
         res.status(500).json({error: error.message})
      }
   }
   
   static async getUserInformation(req, res, next){
      try {
         const user = await Player.find();
         res.json(user);
      } catch (error) {
         res.status(500).json({error: error.message})
      }
   }
}