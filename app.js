require('dotenv').config();
const express = require('express')
const app = express()
const port = 3000
const cors = require('cors');

app.use(cors())
app.use(express.json())


const v1 = require('./router/v1/index.js')
app.use('/v1', v1)


if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Starting http://localhost:${port}`);
    });
}

module.exports = app