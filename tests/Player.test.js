const Player = require("../models/Player");
jest.mock("@services/mysql.service");

/* global beforeEach, expect, test */
const { prismaMock } = require('../singleton')

test('Test player id', () => {
    const player = new Player(89);
    expect(player.getId()).toBe(89);
});

test('find function returns the right player', async () => { 
    let mock = {
        find: {
            findUnique: jest.fn()
        }
    }
    Player.find(800)
    await expect(mock.find.findUnique).toHaveBeenCalled();
});


