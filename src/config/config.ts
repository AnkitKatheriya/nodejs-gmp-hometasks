const { DB_PORT, DB_PWD, SECRET_KEY, APP_PORT } = process.env;

export = {
  host: 'localhost',
  port: DB_PORT || 5432,
  database: 'postgres',
  userName: 'postgres',
  password: DB_PWD || 'Postgresdb@23',
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {},
  databaseLoging: false,
  secret_key:
    SECRET_KEY ||
    '7edd0cc7c7f0084b9d629d7d905588d29e2c7c9921513f3c0a13a92db6df0f6aa6ebb5dd5673f5f3501bc505c892e785',
  application_port: APP_PORT || 8080,
  expriration_time: 600,
};
