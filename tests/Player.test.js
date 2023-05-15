const Player = require("../models/Player");

/* global beforeEach, expect, test */
const { prismaMock } = require('../singleton')

test('Test player id', () => {
    const player = new Player(89);
    expect(player.getId()).toBe(89);
});

test('find function returns the right player', async () => { 
    const user = {
        id: 800,
        name: 'name',
        money: 11111
    }
    
    prismaMock.user.create.mockResolvedValue(user)
    
    await expect(Player.find(800)).resolves.toEqual({
        id: 800,
        name: 'name',
        money: 11111
    });
});


