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
        name: 'Player 800',
        money: 11111
    }
    
    mockCtx.prisma.user.findUnique.mockResolvedValue(user)
    
    await expect(Player.find(800, mockCtx)).resolves.toEqual({
        id: 800,
        name: 'Player 800',
        money: 11111
    });
});

test('Buy property updates the property properly', async () => {
    const user = {
        id: 801,
        name: 'Player 800',
        money: 11112,
    };

    let playerClass = new Player(user.id);

    const propertyObj = {
        id: 123,
        name: 'Pentagon',
        userId: null,
        houses: 0,
        price: 9001,
        rent: 300,
        collection: 'places',
        owned: false
    };

    mockCtx.prisma.user.findUnique.mockResolvedValue(user);
    mockCtx.prisma.property.findUnique.mockResolvedValue(propertyObj);
    mockCtx.prisma.user.update.mockResolvedValue(user);
    mockCtx.prisma.property.update.mockResolvedValue(propertyObj);

    let updates = playerClass.buyProperty(propertyObj.id, mockCtx);

    console.log(updates);
    console.log("Update property: " + updates.property);

    await expect(updates).resolves.toEqual({
        id: 123,
        name: 'Pentagon',
        userId: user.id,
        houses: 0,
        price: 9001,
        rent: 300,
        collection: 'places',
        owned: true
    });
});


