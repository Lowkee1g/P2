var Player = require("../models/Player");
var Property = require("../models/PropertyTile");
const { PrismaClient } = require("@prisma/client");
var session = require("express-session");
const prisma = new PrismaClient();

module.exports = class player {
    static async getPlayer(req,res,next) {
        try {

            const user = await Player.findByName(req.query.name);
            console.log(user);
            res.send(user);
         } catch (error) {
            res.status(500).json({ error: error.message });
         }
     }

     static async getProperties(req,res,next) {
        try {
            
        } catch (error) {
           res.status(500).json({error: error.message})
        }
     }
};
