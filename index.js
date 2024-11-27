// --- CONST ---
const express = require("express")
const cors = require('cors');
const dotenv = require("dotenv")
dotenv.config();
const port = process.env.PORT

// --- ROUTER ---
const auth = require('./router/auth')

const app = express()
app.use(express.json())

app.use(cors({
    origin: true,
    methods: ['GET', 'POST', 'PUT'],
    credentials: true
  }));

// --- PATH ---
app.get('/', (req, res) => {
    res.json({message: 'Hello world !'})
})

app.use('/auth', auth)

// --- START SERVER ---
app.listen(port, () => {
    console.log('App listen on port : ' + port)
})