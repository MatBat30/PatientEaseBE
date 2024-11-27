const mysql = require("mysql2")
const dotenv = require('dotenv');
dotenv.config(); 

const db = mysql.createPool({  
    host: process.env.DB_HOST,  
    user: process.env.DB_USER_API,   
    password: process.env.DB_PASSWORD_API, 
    database : process.env.DB_NAME
});

module.exports = db