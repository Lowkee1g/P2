const chancecard = require('../public/src/chancecard');

test('Test chance card', () => {
    expect(chancecard.getQuote()).toBeDefined();
});
