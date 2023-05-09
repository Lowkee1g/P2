const chancecard = require('../public/src/chancecard');

test('Test chance card', () => {
    const logSpy = jest.spyOn(global.console, 'log');
    // expect(getQuote()).toBeDefined();
    chancecard.getQuote();
    expect(logSpy).toHaveBeenCalled();
});
