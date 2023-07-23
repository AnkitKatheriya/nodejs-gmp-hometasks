module.exports = {
    database: 'PostgreSQL 15',
    userName: 'sa',
    password: 'postgresql',
    host: 'localhost',
    port: '5432',
    dialect:'postgres',
    protocol:'postgres',
    dialectOptions: {
        ssl: true
    }
}