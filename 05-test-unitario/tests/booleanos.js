test('un valor booleano debería ser verdadero', () => {
    expect(true).toBeTruthy();
    expect(1).toBeTruthy();
  });

  test('un valor debería ser falso', () => {
    expect(false).toBeFalsy();
    expect(0).toBeFalsy();
    expect(null).toBeFalsy();
    expect(undefined).toBeFalsy();
  });

  test('un valor null debería ser exactamente null', () => {
    const val = null;
    expect(val).toBeNull();
  });

  test('un valor debería estar definido', () => {
    const val = 42;
    expect(val).toBeDefined();
  });

  test('un valor debería ser undefined', () => {
    let val;
    expect(val).toBeUndefined();
});