test('el número debe ser mayor que otro', () => {
    expect(5).toBeGreaterThan(3); // 5 es mayor que 3
});

test('el número debe ser mayor o igual a otro', () => {
    expect(5).toBeGreaterThanOrEqual(5); // 5 es igual a 5
    expect(6).toBeGreaterThanOrEqual(5); // 6 es mayor que 5
});

test('el número debe ser menor que otro', () => {
    expect(3).toBeLessThan(5); // 3 es menor que 5
});

test('el número debe ser menor o igual a otro', () => {
    expect(3).toBeLessThanOrEqual(5); // 3 es menor que 5
    expect(5).toBeLessThanOrEqual(5); // 5 es igual a 5
});