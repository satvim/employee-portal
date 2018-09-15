var config = {
    database: {
        host:      'satvimdbinstance.ceskwypdqmh8.us-east-2.rds.amazonaws.com',     // database host
        user:       'satvim',         // your database username
        password: 'welcome1',         // your database password
        port:       3306,         // default MySQL port
        db:       'employeedb'         // your database name
    },
    server: {
        host: '127.0.0.1',
        port: '3000'
    }
}
 
module.exports = config
