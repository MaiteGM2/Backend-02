const request = require('supertest');
const app = require('../express.js');
const db = require('../database/sqlite.js');

jest.mock('../database/sqlite.js', () => ({
    all: jest.fn(),
}))

describe('GET /users', () => {
    it('Devuelve lista de usuarios mockeada', async() => {
        const mockUsers = [
            { id: 1, name: 'Juan' },
            { id: 2, name: 'Juana' }
        ];

        db.all.mockImplementation((query, params, callback) => {
            callback(null, mockUsers);
        })

        const response = await request(app).get('/users');

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockUsers);
    })

    it('Devuelve 500 si hubo un error', async() => {
        db.all.mockImplementation((query, params, callback) => {
            callback(new Error('Error de la base de datos'), null);
        });

        const response = await request(app).get('/users');

        expect(response.status).toBe(500);
        expect(response.body).toEqual({"error": "Error de la base de datos"});
    })
})