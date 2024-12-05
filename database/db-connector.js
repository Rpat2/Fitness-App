

var mysql = require('mysql')

// Create a 'connection pool' using the provided credentials
var pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'classmysql.engr.oregonstate.edu',
    user            : 'cs361_patelros',
    password        : 'Fitness@825',
    database        : 'cs361_patelros'
})

// Export it for use in our applicaiton
module.exports.pool = pool;