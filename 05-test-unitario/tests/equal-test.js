test('los objetos deben ser iguales', () => {
  const obj1 = { name: 'Alice', age: 30 };
  const obj2 = { name: 'Alice', age: 30 };
  expect(obj1).toEqual(obj2); 
});

test('el objeto debe tener las propiedades correctas', () => {
  const user = {
    id: 1,
    name: 'Bob',
    isActive: true,
    details: { age: 25, city: 'Madrid' }
  };

  expect(user).toEqual({
    id: 1,
    name: 'Bob',
    isActive: true,
    details: { age: 25, city: 'Madrid' }
  });
});