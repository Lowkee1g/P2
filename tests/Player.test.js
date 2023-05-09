const Player = require("../models/Player");

test('Test player id', () => {
    const player = new Player(89);
    expect(player.getId()).toBe(89);
});

