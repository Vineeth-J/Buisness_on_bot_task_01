const Pool = require('pg').Pool;

const pool = new Pool({
    user:"postgres",
    password:"1234",
    database:"Bottask",
    host:"localhost",
    port:5432
})


module.exports = pool;