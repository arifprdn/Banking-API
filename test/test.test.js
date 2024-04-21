const request = require('supertest')
const app = require('../app')


test('test create user -> success', async () => {

    const { statusCode, body } = await request(app)
        .post('/v1/users')
        .send({
            name: "tes000f",
            email: "tes000f@mail.com",
            password: "tes000123f",
            identity_type: "KTP",
            identity_number: "1271000100010",
            address: "JL Medan"
        });

    console.log(body)

    expect(statusCode).toBe(201);
    expect(body).toHaveProperty('status');
    expect(body).toHaveProperty('message');
    expect(body).toHaveProperty('data');
    expect(body.status).toBe('true');
    expect(body.data).toHaveProperty('id');
    expect(body.data).toHaveProperty('name');
    expect(body.data).toHaveProperty('email');
    expect(body.data).toHaveProperty('password');
    expect(body.data).toHaveProperty('profile');
    expect(body.data.name).toBe("tes000f");
    expect(body.data.email).toBe("tes000f@mail.com");
    expect(body.data.password).toBe("tes000123f");
})

test('test create user email exist -> error', async () => {

    const { statusCode, body } = await request(app)
        .post('/v1/users')
        .send({
            name: "tes000f",
            email: "tes000f@mail.com",
            password: "tes000123f",
            identity_type: "KTP",
            identity_number: "1271000100010",
            address: "JL Medan"
        });

    console.log(body)

    expect(statusCode).toBe(400);
    expect(body).toHaveProperty('status');
    expect(body).toHaveProperty('message');
    expect(body).toHaveProperty('data');
    expect(body.status).toBe(false);
    expect(body.message).toBe('Email already used!')
})

test('test get user by id -> success', async () => {

    const { statusCode, body } = await request(app)
        .get('/v1/users/1')

    console.log(body)

    expect(statusCode).toBe(200);
    expect(body).toHaveProperty('status');
    expect(body).toHaveProperty('message');
    expect(body).toHaveProperty('data');
    expect(body.status).toBe(true);
    expect(body.message).toBe('ok')
    expect(body.data).toHaveProperty('id');
    expect(body.data).toHaveProperty('name');
    expect(body.data).toHaveProperty('email');
    expect(body.data).toHaveProperty('password');
    expect(body.data.id).toBe(1);
    expect(body.data.name).toBe("tes000f");
    expect(body.data.email).toBe("tes000f@mail.com");
    expect(body.data.password).toBe("tes000123f");
})

test('test get user by id -> error', async () => {

    const { statusCode, body } = await request(app)
        .get('/v1/users/1000')

    console.log(body)

    expect(statusCode).toBe(400);
    expect(body).toHaveProperty('status');
    expect(body).toHaveProperty('message');
    expect(body).toHaveProperty('data');
    expect(body.status).toBe(false);
    expect(body.message).toBe('cant find user with id 1000')
})


test('test create bank account -> success', async () => {

    const { statusCode, body } = await request(app)
        .post('/v1/accounts')
        .send({
            bank_name: "BNI",
            bank_account_number: "5555555555555",
            balance: 150000,
            user_id: 1
        });

    console.log(body)

    expect(statusCode).toBe(201);
    expect(body).toHaveProperty('status');
    expect(body).toHaveProperty('message');
    expect(body).toHaveProperty('data');
    expect(body.status).toBe('true');
    expect(body.message).toBe('ok')
    expect(body.data).toHaveProperty('id');
    expect(body.data).toHaveProperty('bank_name');
    expect(body.data).toHaveProperty('bank_account_number');
    expect(body.data).toHaveProperty('balance');
    expect(body.data).toHaveProperty('user_id');
    expect(body.data.bank_name).toBe("BNI");
    expect(body.data.bank_account_number).toBe("5555555555555");
    expect(body.data.balance).toBe(150000);
    expect(body.data.user_id).toBe(1);
})

test('test get account by id -> success', async () => {

    const { statusCode, body } = await request(app)
        .get('/v1/accounts/1')

    console.log(body)

    expect(statusCode).toBe(200);
    expect(body).toHaveProperty('status');
    expect(body).toHaveProperty('message');
    expect(body).toHaveProperty('data');
    expect(body.status).toBe(true);
    expect(body.message).toBe('ok')
    expect(body.data).toHaveProperty('id');
    expect(body.data).toHaveProperty('bank_name');
    expect(body.data).toHaveProperty('bank_account_number');
    expect(body.data).toHaveProperty('balance');
    expect(body.data).toHaveProperty('user_id');
    expect(body.data.id).toBe(1);
    expect(body.data.bank_name).toBe("BNI");
    expect(body.data.bank_account_number).toBe("5555555555555");
    expect(body.data.balance).toBe("150000");
    expect(body.data.user_id).toBe(1);
})


test('test get account by id -> error', async () => {

    const { statusCode, body } = await request(app)
        .get('/v1/accounts/1000')

    console.log(body)

    expect(statusCode).toBe(400);
    expect(body).toHaveProperty('status');
    expect(body).toHaveProperty('message');
    expect(body).toHaveProperty('data');
    expect(body.status).toBe(false);
    expect(body.message).toBe('cant find Account with id 1000')
})

test('test create transaction -> error', async () => {

    const { statusCode, body } = await request(app)
        .post('/v1/transactions')
        .send({
            source_account_id: 1,
            destination_account_id: 1000,
            amount: 10000
        })

    console.log(body)

    expect(statusCode).toBe(400);
    expect(body).toHaveProperty('status');
    expect(body).toHaveProperty('message');
    expect(body).toHaveProperty('data');
    expect(body.status).toBe(false);
    expect(body.message).toBe('sender or receiver is not exist!')
})



test('test register -> success', async () => {

    const { statusCode, body } = await request(app)
        .post('/v1/auth/register')
        .send({
            name: "tes6",
            email: "tes6@mail.com",
            password: "tes6"
        });

    console.log(body)

    expect(statusCode).toBe(201);
    expect(body).toHaveProperty('status');
    expect(body).toHaveProperty('message');
    expect(body).toHaveProperty('data');
    expect(body.status).toBe(true);
    expect(body.message).toBe('account created')
    expect(body.data).toHaveProperty('id');
    expect(body.data).toHaveProperty('name');
    expect(body.data).toHaveProperty('email');
    expect(body.data.name).toBe("tes6");
    expect(body.data.email).toBe("tes6@mail.com");
})

test('test register already exist -> error', async () => {

    const { statusCode, body } = await request(app)
        .post('/v1/auth/register')
        .send({
            name: "tes6",
            email: "tes6@mail.com",
            password: "tes6"
        });

    console.log(body)

    expect(statusCode).toBe(400);
    expect(body).toHaveProperty('status');
    expect(body).toHaveProperty('message');
    expect(body).toHaveProperty('data');
    expect(body.status).toBe(false);
    expect(body.message).toBe('user already exist')
})

test('test login -> success', async () => {

    const { statusCode, body } = await request(app)
        .post('/v1/auth/login')
        .send({
            email: "tes6@mail.com",
            password: "tes6"
        });

    console.log(body)

    expect(statusCode).toBe(200);
    expect(body).toHaveProperty('status');
    expect(body).toHaveProperty('message');
    expect(body).toHaveProperty('data');
    expect(body.status).toBe(true);
    expect(body.message).toBe('created')
    expect(body.data).toHaveProperty('user')
    expect(body.data).toHaveProperty('token')
})

test('test login -> error', async () => {

    const { statusCode, body } = await request(app)
        .post('/v1/auth/login')
        .send({
            email: "tes6x@mail.com",
            password: "tes6"
        });

    console.log(body)

    expect(statusCode).toBe(400);
    expect(body).toHaveProperty('status');
    expect(body).toHaveProperty('message');
    expect(body).toHaveProperty('data');
    expect(body.status).toBe('Bad Request');
    expect(body.message).toBe('invalid email or password')
})
