const { subtract } = require ("../math.js");

test('2 - 1  es igual a 1', () => {
  expect(subtract(2, 1)).toBe(1);
});