// --- CONST ---
const express = require("express")
const cors = require('cors');
const dotenv = require("dotenv")
dotenv.config();
const port = process.env.PORT

const swaggerUi = require("swagger-ui-express");
const fs = require("fs"); // Pour lire le fichier swagger.json
const path = require("path"); // Pour résoudre le chemin du fichier

// --- ROUTER ---
const auth = require('./router/auth')

const app = express()
app.use(express.json())

app.use(cors({
    origin: true,
    methods: ['GET', 'POST', 'PUT'],
    credentials: true
}));


// Charger le fichier swagger.json
const swaggerDocument = JSON.parse(
    fs.readFileSync(path.join(__dirname, "swagger.json"), "utf8")
);

// Route Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// --- PATH ---
app.get('/', (req, res) => {
    res.json({ message: 'Hello world !' })
})

app.use('/auth', auth)

// --- START SERVER ---
app.listen(port, () => {
    console.log('App listen on port : ' + port)
    console.log(`Documentation Swagger : http://localhost:${port}/api-docs`);
})