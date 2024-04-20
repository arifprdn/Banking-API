const request = require('supertest')
const app = require('../app')


test('test create account -> success', async () => {
    const { statusCode, body } = await request(app)
        .post('/v1/users')
        .send({
            name: "tes000",
            email: "tes000@mail.com",
            pasword: "tes000123",
            identity_type: "KTP",
            identity_number: "1271000100010",
            address: "JL Medan"
        });

    expect(statusCode).toBe(201);
    expect(body).toHaveProperty('status');
    expect(body).toHaveProperty('message');
    expect(body).toHaveProperty('data');
    expect(body.status).toBe(true);
    expect(body.data).toHaveProperty('id');
    expect(body.data).toHaveProperty('name');
    expect(body.data).toHaveProperty('email');
    expect(body.data).toHaveProperty('password');
    expect(body.data).toHaveProperty('profile');
    expect(body.data.name).toBe("tes000");
    expect(body.data.email).toBe("tes000@mail.com");
    expect(body.data.password).toBe("tes000123");
    done()
})


