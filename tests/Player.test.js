const { Prisma } = require(".prisma/client");
const Player = require("../models/Player");

/* global beforeEach, expect, test */
const { prismaMock } = require('../singleton')

test('Test player id', () => {
    const player = new Player(89);
    expect(player.getId()).toBe(89);
});

test('find function returns the right player', async () => { 
    const user = {
        data: { 
            id: 800,
            name: 'Name', 
            money: 16000,
        },
    };

    prismaMock.user.create.mockResolvedValue(user)
        
    await expect(Player.find(800)).resolves.toEqual(user);
});


