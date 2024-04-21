const request = require('supertest')
const app = require('../app')

testAccountName = "tes12"
testAccountEmail = "tes12@mail.com"
testAccountEmail2 = "tes21@mail.com"
testAccountPassword = "tes12"
testAccountIdentityType = "KTP"
testAccountIdentityNumber = "1271110000000001"
testAccountAddress = "Medan"
testAccountBankName = "BNI"
testAccountBankNumber = "5555555555555",
    testAccountBalance = 150000

let authToken = ""

test('test register -> success', async () => {

    const { statusCode, body } = await request(app)
        .post('/v1/auth/register')
        .send({
            name: testAccountName,
            email: testAccountEmail,
            password: testAccountPassword
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
    expect(body.data.name).toBe(testAccountName);
    expect(body.data.email).toBe(testAccountEmail);
})

test('test register already exist -> error', async () => {

    const { statusCode, body } = await request(app)
        .post('/v1/auth/register')
        .send({
            name: testAccountName,
            email: testAccountEmail,
            password: testAccountPassword
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
            email: testAccountEmail,
            password: testAccountPassword
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
    authToken = body.data.token
})

test('test login -> error', async () => {

    const { statusCode, body } = await request(app)
        .post('/v1/auth/login')
        .send({
            email: "noaccountregistered@mail.com",
            password: "noaccountregistered"
        });

    console.log(body)

    expect(statusCode).toBe(400);
    expect(body).toHaveProperty('status');
    expect(body).toHaveProperty('message');
    expect(body).toHaveProperty('data');
    expect(body.status).toBe('Bad Request');
    expect(body.message).toBe('invalid email or password')
})

test('test create user -> success', async () => {

    const { statusCode, body } = await request(app)
        .post('/v1/users')
        .send({
            name: testAccountName,
            email: testAccountEmail2,
            password: testAccountPassword,
            identity_type: testAccountIdentityType,
            identity_number: testAccountIdentityNumber,
            address: testAccountAddress
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
    expect(body.data.name).toBe(testAccountName);
    expect(body.data.email).toBe(testAccountEmail2);
    expect(body.data.password).toBe(testAccountPassword);
})

test('test create user email exist -> error', async () => {

    const { statusCode, body } = await request(app)
        .post('/v1/users')
        .send({
            name: testAccountName,
            email: testAccountEmail2,
            password: testAccountPassword,
            identity_type: testAccountIdentityType,
            identity_number: testAccountIdentityNumber,
            address: testAccountAddress
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
        .set('Authorization', authToken)

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
    expect(body.data.name).toBe(testAccountName);
    expect(body.data.email).toBe(testAccountEmail);
    expect(body.data.password).toBe(testAccountPassword);
})

test('test get user by id -> error', async () => {

    const { statusCode, body } = await request(app)
        .get('/v1/users/1000')
        .set('Authorization', authToken)

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
        .set('Authorization', authToken)
        .send({
            bank_name: testAccountBankName,
            bank_account_number: testAccountBankNumber,
            balance: testAccountBalance,
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
    expect(body.data.bank_name).toBe(testAccountBankName);
    expect(body.data.bank_account_number).toBe(testAccountBankNumber);
    expect(body.data.balance).toBe(testAccountBalance);
    expect(body.data.user_id).toBe(1);
})

test('test get account by id -> success', async () => {

    const { statusCode, body } = await request(app)
        .get('/v1/accounts/1')
        .set('Authorization', authToken)

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
    expect(body.data.bank_name).toBe(testAccountBankName);
    expect(body.data.bank_account_number).toBe(testAccountBankNumber);
    expect(body.data.balance).toBe(testAccountBalance);
    expect(body.data.user_id).toBe(1);
})


test('test get account by id -> error', async () => {

    const { statusCode, body } = await request(app)
        .get('/v1/accounts/1000')
        .set('Authorization', authToken)

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
        .set('Authorization', authToken)
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




