var Player = require("../models/Player");
const { PrismaClient } = require('@prisma/client');
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
}