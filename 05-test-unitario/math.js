function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

module.exports = { add, subtract };



// Resumen de los métodos:

// toBe: Compara valores primitivos con una comparación estricta (===).
// toEqual: Compara objetos, arrays, y otros valores complejos por su estructura y valores.
// toBeTruthy: Verifica que el valor sea "truthy" (equivalente a true en un contexto booleano).
// toBeFalsy: Verifica que el valor sea "falsy" (equivalente a false en un contexto booleano).
// toBeNull: Verifica que el valor sea exactamente null.
// toBeDefined: Verifica que el valor no sea undefined.
// toBeUndefined: Verifica que el valor sea undefined.
// toBeGreaterThan, toBeGreaterThanOrEqual, toBeLessThan, toBeLessThanOrEqual: Compara números y establece relaciones de mayor que, mayor o igual que, menor que y menor o igual que.
