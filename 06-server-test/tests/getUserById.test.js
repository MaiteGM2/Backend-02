const request = require('supertest');
const app = require('../express.js');
const db = require('../database/sqlite.js');

jest.mock('../database/sqlite.js', () => ({
    get: jest.fn()
}))

describe('GET /users/:id', () => {
    it('Devuelve 500 si hubo un error', async() => {
        const id = 100;
        
        db.get.mockImplementation((query, params, callback) => {
            callback(new Error('Error en la base de datos', null));
        })

        const response = await request(app).get(`/users/${id}`);

        if (response.status === 500) {
            expect(response.body).toEqual({ error: 'Error en la base de datos' });
        }
    })

    it('Devuelve 404 si no se encontro el usuario', async() => {
        const id = 100;

        db.get.mockImplementation((query, params, callback) => {
            callback(null, null);
        })

        const response = await request(app).get(`/users/${id}`);

        if (response.status === 404) {
            expect(response.body).toEqual({ message: 'User not found' });
        }
    })

    it('Devuelve 200 si encontro el usuario', async() => {
        const id = 1;

        const mockUser =  { id: 1, name: 'Juan' };
        
        db.get.mockImplementation((query, params, callback) => {
            callback(null, mockUser);
        })

        const response = await request(app).get(`/users/${id}`);

        if (response.status === 200) {
            expect(response.body).toEqual(mockUser);
        }
    })
})