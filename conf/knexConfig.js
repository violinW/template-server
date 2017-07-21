module.exports = require('knex')({
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'root',
        password: 'violin',
        database: 'SCManagement'
    },
    debug: true
});