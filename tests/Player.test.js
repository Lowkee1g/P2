const { Prisma } = require(".prisma/client");
const Player = require("../models/Player");

test('Test player id', () => {
    const player = new Player(89);
    expect(player.getId()).toBe(89);
});

// test('find function returns the right player', async () => {
//     const playerObj = await Prisma.user.findUnique({
//         where: {id: 1},
//     })
//     expect(Player.find(1).name).toMatch(playerObj.name);
// });

