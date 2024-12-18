// --- CONST ---
const express = require("express")
const cors = require('cors');
const dotenv = require("dotenv")
dotenv.config();
const port = process.env.PORT

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require('./swagger/conbineSwagger');

// --- ROUTER ---
const auth = require('./router/auth')
const user = require('./router/user')
const prestation = require('./router/prestation')
const ticket = require('./router/ticket')

const app = express()
app.use(express.json())

app.use(cors({
    origin: true,
    methods: ['GET', 'POST', 'PUT'],
    credentials: true
}));

// --- PATH ---
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get('/', (req, res) => { res.json({ message: 'Hello world !' })})
app.use('/auth', auth)
app.use('/user', user)
app.use('/prestation', prestation)
app.use('/ticket', ticket)

// --- START SERVER ---
app.listen(port, () => {
    console.log('App listen on port : ' + port)
    console.log(`Documentation Swagger : http://localhost:${port}/api-docs`);
})