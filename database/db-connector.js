

var mysql = require('mysql')

// Create a 'connection pool' using the provided credentials
var pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'classmysql.engr.oregonstate.edu',
    user            : 'cs340_patelros',
    password        : '0694',
    database        : 'cs340_patelros'
})

// Export it for use in our applicaiton
module.exports.pool = pool;