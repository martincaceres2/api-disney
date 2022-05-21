import { Sequelize } from 'sequelize';

const db = new Sequelize('disney-api', 'root', 'powerpower', {
    host: 'localhost',
    dialect: 'mysql',
    query: {
        raw: false
    }
});

export default db;


