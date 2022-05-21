import { DataTypes } from 'sequelize';
import db from '../db/database';

const User = db.define('User', {
    email: {
        type: DataTypes.STRING,
        unique: true
    },

    password: {
        type: DataTypes.STRING
    },

    state: {
        type: DataTypes.BOOLEAN,
        defaultValue: 1
    }
});

export default User;
