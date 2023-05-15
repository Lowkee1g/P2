const Player = require("../models/Player");


const { createMockContext } = require('../context')

let mockCtx

beforeEach(() => {
  mockCtx = createMockContext()
})

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
    
    mockCtx.prisma.user.findUnique.mockResolvedValue(user)
    
    await expect(Player.find(800, mockCtx)).resolves.toEqual({
        id: 800,
        name: 'name',
        money: 11111
    });
});


